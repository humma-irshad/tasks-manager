import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

import { TaskStatus } from './get-task.dto';

const GetTasksFilterSchema = z
  .object({
    status: z.enum(TaskStatus),
    search: z.string().toLowerCase(),
  })
  .partial();

export class GetTasksFilterDTO extends createZodDto(GetTasksFilterSchema) {}
