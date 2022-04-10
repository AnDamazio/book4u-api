import { CreateAuthorDto } from '../dtos';
import { CreateLanguageDto } from '../dtos';

export class Book {
  name: string;
  pagesQuantity: number;
  synopsis: string;
  status: string;
  condition: string;
  author: CreateAuthorDto;
  language: CreateLanguageDto;
}
