import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { ProductCreateDto, ProductUpdateDto } from './dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(private dbService: DbService) {}

  async getProducts(): Promise<Product[]> {
    return this.dbService.product.findMany();
  }

  async getProductById(id: string): Promise<Product> {
    return this.dbService.product.findUnique({ where: { id } });
  }

  async createProduct(data: ProductCreateDto): Promise<Product> {
    return this.dbService.product.create({
      data,
    });
  }

  async updateProduct(id: string, data: ProductUpdateDto): Promise<Product> {
    return this.dbService.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.dbService.product.delete({ where: { id } });
  }
}
