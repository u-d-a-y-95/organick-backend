import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from 'src/db/db.module';
import { UserModule } from 'src/user/user.module';
import { SmsModule } from 'src/sms/sms.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DbModule,
    UserModule,
    SmsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory(configService) {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
