import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { UserDTO, signUpDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @ApiOperation({ operationId: 'signupUser' })
  @ApiOkResponse({ type: signUpDTO })
  async signUp(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }
}
