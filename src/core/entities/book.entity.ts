import { CreateAuthorDto, CreatePublisherDto } from '../dtos';

export class Book {
  name: string;
  pagesQuantity: number;
  synopsis: string;
  status: string;
  condition: string;
  author: CreateAuthorDto;
  publisher: CreatePublisherDto;
}
