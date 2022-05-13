import {
  CreateAuthorDto,
  CreatePublisherDto,
  CreateLanguageDto,
  CreateCategoryDto,
  CreateBookImagesDto,
<<<<<<< HEAD
  CreateUserDto
=======
>>>>>>> 24573e1cf095eb61263be8a4e56783439992f08b
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
<<<<<<< HEAD
  owner: CreateUserDto;
=======
>>>>>>> 24573e1cf095eb61263be8a4e56783439992f08b
}
