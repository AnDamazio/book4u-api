import { CreateBookDto, CreateCategoryDto } from '../dtos';

export class BookCategories {
  book?: CreateBookDto;
  category: CreateCategoryDto;
}
