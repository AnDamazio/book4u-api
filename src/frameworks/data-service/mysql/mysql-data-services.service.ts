import { MysqlPersonalDataRepository } from './mysql-personal-data-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, PersonalData, Author, Book, Language, Publisher} from './model';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/core';
import { MysqlUserRepository } from './mysql-user-repository';
import { MysqlAuthorRepository } from './mysql-author.repository';
import { MysqlBookRepository } from './myql-book.repository';
import { MysqlLanguageRepository } from './mysql-language.repository';
import { MysqlPublisherRepository } from './mysql-publisher.repository';

@Injectable()
export class MysqlDataServices
  implements IDataServices, OnApplicationBootstrap
{
  user: MysqlUserRepository<User>;
  personalData: MysqlPersonalDataRepository<PersonalData>;
  book: MysqlBookRepository<Book>;
  author: MysqlAuthorRepository<Author>;
  language: MysqlLanguageRepository<Language>;
  publisher: MysqlPublisherRepository<Publisher>;

  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    @InjectRepository(PersonalData)private PersonalDataRepository: Repository<PersonalData>,
    @InjectRepository(Author) private AuthorRepository: Repository<Author>,
    @InjectRepository(Book) private BookRepository: Repository<Book>,
    @InjectRepository(Language) private LanguageRepository: Repository<Language>,
    @InjectRepository(Publisher)private PublisherRepository: Repository<Publisher>,
  ) {}

  onApplicationBootstrap() {
    this.user = new MysqlUserRepository<User>(this.UserRepository);
    this.personalData = new MysqlPersonalDataRepository<PersonalData>(this.PersonalDataRepository,);
    this.author = new MysqlAuthorRepository<Author>(this.AuthorRepository);
    this.book = new MysqlBookRepository<Book>(this.BookRepository);
    this.language = new MysqlLanguageRepository<Language>(this.LanguageRepository);
    this.publisher = new MysqlPublisherRepository<Publisher>(this.PublisherRepository);
  }
}
