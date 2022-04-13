import { CreateAuthorDto, CreatePublisherDto, CreateLanguageDto, CreateCategoryDto } from '../dtos';

export class Book {
  name: string;
  pagesQuantity: number;
  synopsis: string;
  status: string;
  condition: string;
  author: CreateAuthorDto;
  language: CreateLanguageDto;
  publisher: CreatePublisherDto;
  category: CreateCategoryDto;
}
