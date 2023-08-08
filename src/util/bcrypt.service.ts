import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private saltNumber: number;
  constructor(private configService: ConfigService) {
    this.saltNumber = Number(this.configService.get('SALT_NUMBER'));
  }

  async getHash(
    value: string | Buffer,
    saltNumber: number = this.saltNumber,
  ): Promise<string> {
    return bcrypt.hash(value, saltNumber);
  }

  async verifyHash(value, hashedValue): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
