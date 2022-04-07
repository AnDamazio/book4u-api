import { Injectable } from '@nestjs/common';
import { Author } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateAuthorDto } from '../../../core/dtos';
import { AuthorFactoryService } from './author-factory.service';

@Injectable()
export class AuthorServices {
  constructor(
    private dataServices: IDataServices,
    private authorFactoryService: AuthorFactoryService,
  ) {}

  getAllAuthors(): Promise<Author[]> {
    return this.dataServices.author.findAll();
  }

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorFactoryService.createNewAuthor(createAuthorDto);
    return this.dataServices.author.create(author);
  }
}
