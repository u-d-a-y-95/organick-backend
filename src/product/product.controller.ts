import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';
import { ProductCreateDto, ProductUpdateDto } from './dtos/product.dto';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() body: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(body);
  }

  @Put(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() body: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
