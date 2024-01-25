import { createZodDto } from 'nestjs-zod';

import { TasksSchema } from './get-task.dto';

const updateTaskStatusSchema = TasksSchema.pick({ status: true }).required();

export class UpdateTaskStatusDTO extends createZodDto(updateTaskStatusSchema) {}
