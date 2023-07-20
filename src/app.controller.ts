import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private databaseService: PrismaService,
  ) {}

  @Get()
  async getHello() {
    await this.databaseService.user.create({
      data: {
        name: 'uday',
        mobile: '01830546042',
        password: '123456',
      },
    });
    return this.appService.getHello();
  }
}
