import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(private configService: ConfigService) {}
  getOtp(digit = 6): number {
    let otp = '';
    for (let i = 0; i < digit; i++) {
      otp += String(Math.ceil(Math.random() * 10));
    }
    return Number(otp);
  }

  sendOtp(data) {
    const otp = this.getOtp();
    const message = `Your verificode is ${otp}`;
    this.sendSms(message, data.mobile);
  }

  sendSms(message: string, mobile: string) {
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
