import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetTasksDTO, ListAllTasksDTO } from './dto/get-task.dto';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({ operationId: 'getAllTasks' })
  @ApiOkResponse({ type: ListAllTasksDTO })
  getTasks(@Body() filterDTO: GetTasksFilterDTO, @GetUser() user: User) {
    if (Object.keys.length) {
      return this.taskService.getTasksWithFilter(filterDTO, user);
    }

    return this.taskService.getAllTasks(user);
  }

  @Get('/:id')
  @ApiOperation({ operationId: 'getTaskById' })
  @ApiOkResponse({ type: GetTasksDTO })
  getTaskById(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  @ApiOperation({ operationId: 'createTask' })
  @ApiOkResponse({ type: GetTasksDTO })
  createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User) {
    return this.taskService.createTask(createTaskDTO, user);
  }

  @Patch('/:id/status')
  @ApiOperation({ operationId: 'updateTaskStatus' })
  @ApiOkResponse({ type: GetTasksDTO })
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
    @GetUser() user: User,
  ) {
    const { status } = updateTaskStatusDTO;
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  @ApiOperation({ operationId: 'deleteTask' })
  @ApiOkResponse({ description: 'Task has been deleted' })
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.deleteTask(id, user);
  }
}
