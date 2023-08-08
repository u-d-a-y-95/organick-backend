import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  getUserByMobileNumber(number: string) {
    return this.dbService.user.findUnique({
      where: {
        mobile: number,
      },
    });
  }

  createUser(data) {
    return this.dbService.user.create({ data });
  }

  deleteUser(id: string) {
    return this.dbService.user.delete({
      where: {
        id,
      },
    });
  }
}
