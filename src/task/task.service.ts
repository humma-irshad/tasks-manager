import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GetTasksDTO, TTaskStatus } from './dto/get-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Tasks } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  private logger = new Logger('TasksController');

  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  private mapTaskToDTO(task: Tasks): GetTasksDTO {
    const getTasksDTO = new GetTasksDTO();
    getTasksDTO.id = task.id;
    getTasksDTO.title = task.title;
    getTasksDTO.description = task.description;
    getTasksDTO.status = task.status;

    return getTasksDTO;
  }

  async getAllTasks(user: User) {
    return await this.tasksRepository.find({ where: { user } });
  }

  async getTasksWithFilter(filterDTO: GetTasksFilterDTO, user: User) {
    this.logger.verbose(
      `The user "${
        user.username
      }" is trying to retrieve all their tasks with filters ${JSON.stringify(
        filterDTO,
      )}}`,
    );
    const { search, status } = filterDTO;

    let tasks = await this.getAllTasks(user);

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  async getTaskById(id: string, user: User) {
    const found = await this.tasksRepository.findOne({ where: { user, id } });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createTask({ title, description }: CreateTaskDTO, user: User) {
    this.logger.verbose(
      `The user "${user.username}" is creating the task: ${JSON.stringify(
        user.task,
      )}`,
    );

    const task = await this.tasksRepository.save({ title, description, user });

    return this.mapTaskToDTO(task);
  }

  async updateTaskStatus(id: string, status: TTaskStatus, user: User) {
    const task = await this.getTaskById(id, user);

    if (!task) throw new NotFoundException();

    task.status = status;
    this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User) {
    const result = await this.tasksRepository.delete({ user, id });

    if (result.affected == 0) throw new NotFoundException();
  }
}
