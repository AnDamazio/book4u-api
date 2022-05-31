import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../../core/abstracts';
import { CreateBookCategoriesDto } from 'src/core/dtos/book-categories.dto';

@Injectable()
export class BookCategoriesServices {
  constructor(private dataServices: IDataServices) {}

  async saveBookCategories(
    bookCategories: CreateBookCategoriesDto,
  ): Promise<CreateBookCategoriesDto> {
    console.log(bookCategories);
    return await this.dataServices.bookCategories.saveRelation(bookCategories);
  }
}
