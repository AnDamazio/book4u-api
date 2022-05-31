import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../../core/dtos';
import { Category } from 'src/core/entities/category.entity';

@Injectable()
export class CategoryFactoryService {
  createNewCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category();
    newCategory.name = createCategoryDto.name;
    newCategory.bookCategories = createCategoryDto.bookCategories;
    return newCategory;
  }
}
