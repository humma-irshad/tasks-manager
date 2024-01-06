import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetTasksDTO, ListAllTasksDTO } from './dto/get-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({ operationId: 'getAllTasks' })
  @ApiOkResponse({ type: ListAllTasksDTO })
  getTasks(@Body() filterDTO: GetTasksFilterDTO) {
    if (Object.keys.length) {
      return this.taskService.getTasksWithFilter(filterDTO);
    }

    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  @ApiOperation({ operationId: 'getTaskById' })
  @ApiOkResponse({ type: GetTasksDTO })
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiOperation({ operationId: 'createTask' })
  @ApiOkResponse({ type: GetTasksDTO })
  createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDTO);
  }

  @Patch('/:id/status')
  @ApiOperation({ operationId: 'updateTaskStatus' })
  @ApiOkResponse({ type: GetTasksDTO })
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ) {
    const { status } = updateTaskStatusDTO;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  @ApiOperation({ operationId: 'deleteTask' })
  @ApiOkResponse({ description: 'Task has been deleted' })
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
