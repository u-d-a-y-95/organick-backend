import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SignupDto } from './dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class AuthService {
  constructor(
    private dbService: DbService,
    private userService: UserService,
    private smsService: SmsService,
  ) {}

  async signup(data: SignupDto) {
    const res = await this.userService.getUserByMobileNumber(data.mobile);
    if (!res) {
      return this.smsService.sendOtp(data);
    }
    return res;
  }

  // async verifyUser(data: SignupDto) {}
}
