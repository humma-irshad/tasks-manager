import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GetTasksDTO, TaskStatus, TTaskStatus } from './dto/get-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Tasks } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  async getAllTasks() {
    return await this.tasksRepository.find();
  }

  async getTasksWithFilter(filterDTO: GetTasksFilterDTO) {
    const { search, status } = filterDTO;

    let tasks = await this.getAllTasks();

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

  getTaskById(id: string) {
    const found = this.tasksRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  createTask({ title, description }: CreateTaskDTO) {
    const task: GetTasksDTO = {
      id: uuid(),
      title,
      description,
      status: TaskStatus[0],
    };
    this.tasksRepository.save(task);

    return task;
  }

  async updateTaskStatus(id: string, status: TTaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;

    return task;
  }

  async deleteTask(id: string) {
    const result = await this.tasksRepository.delete({ id });

    if (result.affected == 0) throw new NotFoundException();
  }
}
