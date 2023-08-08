import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { VerifyDto } from './dtos/verify.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  sign(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('verify')
  verify(@Body() verifyDto: VerifyDto) {
    return this.authService.verifyOtp(verifyDto);
  }
}
