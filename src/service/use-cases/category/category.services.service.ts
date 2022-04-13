import { Injectable } from '@nestjs/common';
import { Category } from '../../../core/entities/category.entity';
import { IDataServices } from '../../../core/abstracts';
import { CreateCategoryDto } from '../../../core/dtos';
import { CategoryFactoryService } from './category-factory.service';

@Injectable()
export class CategoryServices {
  constructor(
    private dataServices: IDataServices,
    private categoryFactoryService: CategoryFactoryService,
  ) {}

  getAllCategories(): Promise<Category[]> {
    return this.dataServices.category.findAll();
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    if (await this.dataServices.category.checkIfExists(createCategoryDto.name)) {
      const category = this.categoryFactoryService.createNewCategory(createCategoryDto);
      return this.dataServices.category.create(category.name);
    } else {
      return this.dataServices.author.findOneByName(createCategoryDto.name);
    }
  }
}
