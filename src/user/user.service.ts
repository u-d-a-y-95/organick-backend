import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  getUsers() {
    return this.dbService.user.findMany();
  }

  getUserById(id: string) {
    return this.dbService.user.findUnique({
      where: {
        id,
      },
    });
  }

  createUser(data) {
    return this.dbService.user.create({ data });
  }
}
