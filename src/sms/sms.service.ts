import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  getOtp(digit = 6): number {
    let otp = '';
    for (let i = 0; i < digit; i++) {
      otp += String(Math.floor(Math.random() * 10));
    }
    return Number(otp);
  }

  async sendOtp(data) {
    const otp = this.getOtp();
    const message = `Your verificode is ${otp}`;
    await this.cacheManager.set(`otp-${data.mobile}`, {
      otp,
      data,
    });
    this.sendSms(message, '+8801830546042' || data.mobile);
    return {
      message: 'otp is send to the ',
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
}
