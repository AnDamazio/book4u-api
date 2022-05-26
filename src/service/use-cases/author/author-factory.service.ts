import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../../../core/dtos';
import { Author } from 'src/core/entities/author.entity';

@Injectable()
export class AuthorFactoryService {
  createNewAuthor(createAuthorDto: CreateAuthorDto) {
    const newAuthor = new Author();
    newAuthor.name = createAuthorDto.name;
    return newAuthor;
  }
}
