import { CreateBookCategoriesDto } from '../dtos/book-categories.dto';

export class Category {
  name: string;
  bookCategories?: CreateBookCategoriesDto[];
}
