import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  getUsers() {
    return this.dbService.user.findMany();
  }

  createUser(data) {
    return this.dbService.user.create({ data });
  }
}
