import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../../../core/dtos';
import { Author } from 'src/core/entities/author.entity';

@Injectable()
export class AuthorFactoryService {
  createNewAuthor(createAuthorDto: CreateAuthorDto) {
    const newAutor = new Author();
    newAutor.name = createAuthorDto.name;
    return newAutor;
  }
}
