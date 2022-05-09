import {
  CreateAuthorDto,
  CreatePublisherDto,
  CreateLanguageDto,
  CreateCategoryDto,
  CreateBookImagesDto,
} from '../dtos';

export class Book {
  name: string;
  pagesQuantity: number;
  synopsis: string;
  status: string;
  condition: string;
  author: CreateAuthorDto;
  language: CreateLanguageDto;
  publisher: CreatePublisherDto;
  category: CreateCategoryDto[];
  bookImages: CreateBookImagesDto;
}
