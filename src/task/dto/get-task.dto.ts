import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const TaskStatus = ['OPEN', 'IN_PROGRESS', 'DONE'] as const;
// TS syntax that converts an enum into union type
export type TTaskStatus = (typeof TaskStatus)[number];

export const TasksSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().max(30),
  status: z.enum(TaskStatus).default(TaskStatus[0]),
});

const ListAllTasks = z.array(TasksSchema);

export class GetTasksDTO extends createZodDto(TasksSchema) {}

// ApiOkResponse type
export class ListAllTasksDTO extends createZodDto(ListAllTasks) {}
