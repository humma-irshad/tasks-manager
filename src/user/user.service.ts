import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { CredentialsDTO } from './dto/user.dto';
import IJwtPayload from './interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser({ username, password }: CredentialsDTO) {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    try {
      await this.userRepository.save({ username, password: hashedPassword });
      const payload: IJwtPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
      return { accessToken };
    } catch (error) {
      // duplicate username
      if (error.code == '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn({ username, password }: CredentialsDTO) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await compare(password, user.password))) {
      const payload: IJwtPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
      console.log({ username, password });
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
