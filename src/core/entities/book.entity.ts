import {
  CreateAuthorDto,
  CreatePublisherDto,
  CreateLanguageDto,
  CreateBookImagesDto,
  CreateUserDto,
  CreateCategoryDto,
} from '../dtos';
import { CreateBookCategoriesDto } from '../dtos/book-categories.dto';

export class Book {
  name: string;
  pagesQuantity: number;
  synopsis: string;
  price: string;
  status: string;
  condition: string;
  createdAt?: string;
  author: CreateAuthorDto;
  language: CreateLanguageDto;
  publisher: CreatePublisherDto;
  bookImages: CreateBookImagesDto;
  owner: CreateUserDto;
  category?: CreateCategoryDto[];
  bookCategories?: CreateBookCategoriesDto[];
}
