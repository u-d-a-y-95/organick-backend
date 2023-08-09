import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CategoryCreateDto, CategoryUpdateDto } from './dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(private dbService: DbService) {}

  async getCategories(): Promise<Category[]> {
    return this.dbService.category.findMany();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.dbService.category.findUnique({ where: { id } });
  }

  async createCategory(data: CategoryCreateDto): Promise<Category> {
    return this.dbService.category.create({
      data,
    });
  }

  async updateCategory(id: string, data: CategoryUpdateDto): Promise<Category> {
    return this.dbService.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.dbService.category.delete({ where: { id } });
  }
}
