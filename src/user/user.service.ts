import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser({ username, password }: UserDTO) {
    const user: UserDTO = { id: uuid(), username, password };
    console.log(user);

    // await this.userRepository.save(user);
  }
}
