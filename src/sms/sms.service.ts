import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  getOtp(digit = 6): string {
    let otp = '';
    for (let i = 0; i < digit; i++) {
      otp += String(Math.floor(Math.random() * 10));
    }
    return otp;
  }

  async sendOtp(data) {
    const mode = this.configService.get<string>('MODE');
    const otpLength = this.configService.get<number>('SMS_OTP_LENGTH');
    const otpTtl = this.configService.get<number>('OTP_TTL');
    const otp = this.getOtp(otpLength);
    const message = `Your verificode is ${otp}`;
    const mobile =
      mode === 'DEVELOPMENT'
        ? this.configService.get<string>('SMS_DEMO_NUMBER')
        : data.mobile;

    console.log(otpTtl, typeof otpTtl);
    await this.cacheManager.set(
      `otp-${data.mobile}`,
      {
        otp,
        data,
      },
      Number(otpTtl),
    );

    // this.sendSms(message, mobile);
    return {
      mobile: data.mobile,
      message: `otp is send to the ${mobile} - ${otp}`,
    };
  }

  private sendSms(message: string, mobile: string) {
    const client = new Twilio(
      this.configService.get<string>('SMS_ACCOUNT_ID'),
      this.configService.get<string>('SMS_AUTH'),
    );
    client.messages.create({
      from: this.configService.get<string>('SMS_OWNER_NUMBER'),
      to: mobile,
      body: message,
    });
  }

  async verifyOtp(mobile: string, otp: string) {
    const cacheValue = await this.cacheManager.get<{
      otp: string;
      data: SignupDto;
    }>(`otp-${mobile}`);
    if (cacheValue.otp === otp) {
      return {
        status: 200,
        data: cacheValue.data,
      };
    }
    return {
      status: 404,
      message: `Otp is not correct`,
    };
  }
}
