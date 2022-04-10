import { MysqlPersonalDataRepository } from './mysql-personal-data-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, PersonalData, Author, Book, Publisher } from './model';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  ICategoryRepository,
  IDataServices,
  IPublisherRepository,
} from 'src/core';
import { MysqlUserRepository } from './mysql-user-repository';
import { MysqlAuthorRepository } from './mysql-author.repository';
import { MysqlBookRepository } from './myql-book.repository';
import { MysqlPublisherRepository } from './mysql-publisher.repository';
import { Category } from './model/category.model';
import { MysqlCategoryRepository } from './mysql-category.repository';

@Injectable()
export class MysqlDataServices
  implements IDataServices, OnApplicationBootstrap
{
  user: MysqlUserRepository<User>;
  personalData: MysqlPersonalDataRepository<PersonalData>;
  book: MysqlBookRepository<Book>;
  author: MysqlAuthorRepository<Author>;
  publisher: MysqlPublisherRepository<Publisher>;
  category: MysqlCategoryRepository<Category>;

  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    @InjectRepository(PersonalData)
    private PersonalDataRepository: Repository<PersonalData>,
    @InjectRepository(Author) private AuthorRepository: Repository<Author>,
    @InjectRepository(Book) private BookRepository: Repository<Book>,
    @InjectRepository(Publisher)
    private PublisherRepository: Repository<Publisher>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  onApplicationBootstrap() {
    this.user = new MysqlUserRepository<User>(this.UserRepository);
    this.personalData = new MysqlPersonalDataRepository<PersonalData>(
      this.PersonalDataRepository,
    );
    this.author = new MysqlAuthorRepository<Author>(this.AuthorRepository);
    this.book = new MysqlBookRepository<Book>(this.BookRepository);
    this.publisher = new MysqlPublisherRepository<Publisher>(
      this.PublisherRepository,
    );
    this.category = new MysqlCategoryRepository<Category>(
      this.CategoryRepository,
    );
  }
}
