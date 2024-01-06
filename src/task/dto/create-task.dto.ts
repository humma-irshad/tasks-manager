import { createZodDto } from 'nestjs-zod';

import { TasksSchema } from './get-task.dto';

const CreateTaskSchema = TasksSchema.pick({ title: true, description: true });

export class CreateTaskDTO extends createZodDto(CreateTaskSchema) {}
