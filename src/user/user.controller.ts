import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CredentialsDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { AccessTokenDTO } from './dto/access-token.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @ApiOperation({ operationId: 'signupUser', tags: ['user'] })
  async signUp(@Body() credentialsDTO: CredentialsDTO) {
    console.log(credentialsDTO);
    return this.userService.createUser(credentialsDTO);
  }

  @Post('/signin')
  @ApiOperation({ operationId: 'signinUser', tags: ['user'] })
  @ApiOkResponse({
    type: AccessTokenDTO,
    description: 'User has been logged-in',
  })
  @ApiUnauthorizedResponse({
    description: 'Please check your login credentials',
  })
  async signIn(@Body() credentialsDTO: CredentialsDTO) {
    return this.userService.signIn(credentialsDTO);
  }
}
