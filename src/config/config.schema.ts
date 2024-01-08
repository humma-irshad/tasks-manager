import { z } from 'nestjs-zod/z';

const stage = ['dev', 'prod'] as const;

export const ConfigSchema = z
  .object({
    STAGE: z.enum(stage),
    DB_HOST: z.string(),
    DB_PORT: z.number().default(5432),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.password(),
    DB_DATABASE: z.string(),
  })
  .required();
