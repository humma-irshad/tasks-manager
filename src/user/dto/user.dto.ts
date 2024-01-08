import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(4).max(12),
  password: z.string().min(6).max(20),
});
export class UserDTO extends createZodDto(UserSchema) {}
export class CredentialsDTO extends createZodDto(
  UserSchema.pick({ username: true, password: true }),
) {}
