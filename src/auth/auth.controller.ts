import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dtos/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('signup')
  sign(@Body() signupDto: SignupDto) {
    return 'hello';
  }
}
