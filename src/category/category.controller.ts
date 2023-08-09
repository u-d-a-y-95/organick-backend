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
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { CategoryCreateDto, CategoryUpdateDto } from './dtos/category.dto';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('Categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() body: CategoryCreateDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  @Put(':id')
  async updateCategoryById(
    @Param('id') id: string,
    @Body() body: CategoryUpdateDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
