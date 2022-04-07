import { IPersonalDataRepository } from 'src/core';
import { User, PersonalData, Author, Book } from '../entities';
import { IAuthorRepository } from './author-repository.abstract';
import { IBookRepository } from './book-repository.abstract';
import { IUserRepository } from './user-repository-abstract';

export abstract class IDataServices {
  abstract user: IUserRepository<User>;
  abstract personalData: IPersonalDataRepository<PersonalData>;
  abstract author: IAuthorRepository<Author>;
  abstract book: IBookRepository<Book>;
}
