import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { SmsService } from 'src/sms/sms.service';
import { VerifyDto } from './dtos/verify.dto';
import { BcryptService } from 'src/util/bcrypt.service';
import { SigninDto } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private smsService: SmsService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignupDto) {
    const res = await this.userService.getUserByMobileNumber(data.mobile);
    if (!res) {
      return this.smsService.sendOtp(data);
    }
    return new HttpException('Number is already used', HttpStatus.CONFLICT);
  }

  async verifyOtp(data: VerifyDto) {
    const res = await this.smsService.verifyOtp(data.mobile, data.otp);
    if (res.status === 200) {
      res.data.password = await this.bcryptService.getHash(res.data.password);
      res.data['isVerified'] = true;
      return await this.userService.createUser(res.data);
    }
    return res;
  }

  async signin(data: SigninDto) {
    const res = await this.userService.getUserByMobileNumber(data.mobile);
    if (!res) throw new UnauthorizedException();
    const { password, ...rest } = res;
    const isMatch = await this.bcryptService.verifyHash(
      data.password,
      password,
    );
    if (!isMatch) throw new UnauthorizedException();
    const token = await this.jwtService.signAsync(rest);
    return {
      data: rest,
      token,
    };
  }
}
