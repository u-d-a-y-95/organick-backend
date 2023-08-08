import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { VerifyDto } from './dtos/verify.dto';
import { SigninDto } from './dtos/signin.dto';
import { Public } from './public.decrator';

@ApiTags('Auth')
@Controller('auth')
@Public()
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
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
