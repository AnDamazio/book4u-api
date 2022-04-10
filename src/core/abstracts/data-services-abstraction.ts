import { IPersonalDataRepository } from 'src/core';
import { Category } from 'src/frameworks/data-service/mysql/model/category.model';
import { User, PersonalData, Author, Book, Publisher } from '../entities';
import { IAuthorRepository } from './author-repository.abstract';
import { IBookRepository } from './book-repository.abstract';
import { ICategoryRepository } from './category-repository.abstract';
import { IPublisherRepository } from './publisher-repository.abstract';
import { IUserRepository } from './user-repository-abstract';

export abstract class IDataServices {
  abstract user: IUserRepository<User>;
  abstract personalData: IPersonalDataRepository<PersonalData>;
  abstract author: IAuthorRepository<Author>;
  abstract book: IBookRepository<Book>;
  abstract publisher: IPublisherRepository<Publisher>;
  abstract category: ICategoryRepository<Category>;
}
