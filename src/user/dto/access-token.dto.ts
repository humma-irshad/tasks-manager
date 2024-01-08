import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const AccessTokenSchema = z.object({ accessToken: z.string() });
export class AccessTokenDTO extends createZodDto(AccessTokenSchema) {}
