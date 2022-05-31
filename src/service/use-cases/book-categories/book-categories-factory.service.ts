import { Injectable } from '@nestjs/common';
import { CreateBookCategoriesDto } from 'src/core/dtos/book-categories.dto';

@Injectable()
export class BookCategoriesFactoryService {
  createNewCategory(createBookCategoriesDto: CreateBookCategoriesDto) {
    const newBookCategories = new CreateBookCategoriesDto();
    newBookCategories.book = createBookCategoriesDto.book;
    newBookCategories.category = createBookCategoriesDto.category;
    return newBookCategories;
  }
}
