import { IBookImagesRepository, IPersonalDataRepository } from 'src/core';
import {
  User,
  PersonalData,
  Author,
  Book,
  Language,
  Publisher,
  UserSituation,
  BookImages,
  Request,
  BookCategories,
  ExchangeWithCredit
} from '../entities';
import { IAuthorRepository } from './author-repository.abstract';
import { IBookRepository } from './book-repository.abstract';
import { ILanguageRepository } from './language-repository.abstract';
import { Category } from 'src/frameworks/data-service/mysql/model/category.model';
import { ICategoryRepository } from './category-repository.abstract';
import { IPublisherRepository } from './publisher-repository.abstract';
import { IUserRepository } from './user-repository-abstract';
import { IUserSituationRepository } from './user-situation.abstract';
import { IBookCategoriesRepository, IWishListRepository } from '.';
import { WishList } from '../entities/wish-list.entity';
import { IRequestRepository } from './request-repository.abstract';
import { IExchangeWithCreditRepository } from './exchange-with-credit.abstract'

export abstract class IDataServices {
  abstract user: IUserRepository<User>;
  abstract personalData: IPersonalDataRepository<PersonalData>;
  abstract author: IAuthorRepository<Author>;
  abstract book: IBookRepository<Book>;
  abstract language: ILanguageRepository<Language>;
  abstract publisher: IPublisherRepository<Publisher>;
  abstract category: ICategoryRepository<Category>;
  abstract userSituation: IUserSituationRepository<UserSituation>;
  abstract bookImages: IBookImagesRepository<BookImages>;
  abstract wishList: IWishListRepository<WishList>;
  abstract request: IRequestRepository<Request>;
  abstract bookCategories: IBookCategoriesRepository<BookCategories>;
  abstract exchangeWithCredit: IExchangeWithCreditRepository<ExchangeWithCredit>
}
