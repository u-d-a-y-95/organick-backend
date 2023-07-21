import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private dbService: DbService) {}

  signup(data: SignupDto) {
    return this.dbService.user.create({
      data,
    });
  }
}
