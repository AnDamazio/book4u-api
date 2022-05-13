import {
  CreateAuthorDto,
  CreatePublisherDto,
  CreateLanguageDto,
  CreateCategoryDto,
  CreateBookImagesDto,
  CreateUserDto
} from '../dtos';

export class Book {
  name: string;
  pagesQuantity: number;
  synopsis: string;
  price: string;
  status: string;
  condition: string;
  createdAt: string;
  author: CreateAuthorDto;
  language: CreateLanguageDto;
  publisher: CreatePublisherDto;
  category: CreateCategoryDto[];
  bookImages: CreateBookImagesDto;
  owner: CreateUserDto;
}
