import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from 'src/db/db.module';
import { UserModule } from 'src/user/user.module';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [DbModule, UserModule, SmsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
