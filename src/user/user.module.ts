import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../db/db.module';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [DbModule],
  controllers: [UserController, AddressController],
  providers: [UserService, AddressService],
  exports: [UserService],
})
export class UserModule {}
