import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';
import IJwtPayload from '../interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private configService: ConfigService,
  ) {
    super({
      secretOrKey: new ConfigService().getOrThrow('JWT_SECRET'),
      // tells the passport strategy where to extract token from
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // overriding the default validate method
  // here we already know that the token is valid
  async validate(payload: IJwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException();

    /* on returning the user, the passport 
      is going to inject it to the request
      object of our controller */
    return user;
  }
}
