import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [DbModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
