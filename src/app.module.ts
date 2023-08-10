import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { SmsModule } from './sms/sms.module';
import { CacheModule } from '@nestjs/cache-manager';
import { DbExceptionFilter } from './db/db.exception';
import { UtilModule } from './util/util.module';
import { UnitModule } from './unit/unit.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    UtilModule,
    DbModule,
    AuthModule,
    UserModule,
    SmsModule,
    UnitModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: DbExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
