import { BookCategories } from './model/book-categories.model';
import { MysqlPersonalDataRepository } from './mysql-personal-data-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  User,
  PersonalData,
  Author,
  Book,
  Language,
  Publisher,
  UserSituation,
  BookImages,
  Wish,
  Category,
  AutoRelationBook,
} from './model';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/core';
import { MysqlUserRepository } from './mysql-user-repository';
import { MysqlAuthorRepository } from './mysql-author.repository';
import { MysqlBookRepository } from './mysql-book.repository';
import { MysqlLanguageRepository } from './mysql-language.repository';
import { MysqlPublisherRepository } from './mysql-publisher.repository';
import { MysqlCategoryRepository } from './mysql-category.repository';
import { MysqlUserSituationRepository } from './mysql-user-situation.repository';
import { MysqlWishListRepository } from './mysql-wish-list.repository';
import { MysqlBookImagesRepository } from './mysql-book-images.repository';
import { MysqlAutoRelationBookRepository } from './mysql-auto-relation-books.repository';
import { MysqlBookCategoriesRepository } from './mysql-book-categories.repository';

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
  category: MysqlCategoryRepository<Category>;
  userSituation: MysqlUserSituationRepository<UserSituation>;
  bookImages: MysqlBookImagesRepository<BookImages>;
  wishList: MysqlWishListRepository<Wish>;
  autoRelationBook: MysqlAutoRelationBookRepository<AutoRelationBook>;
  bookCategories: MysqlBookCategoriesRepository<BookCategories>;

  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    @InjectRepository(PersonalData)
    private PersonalDataRepository: Repository<PersonalData>,
    @InjectRepository(Author) private AuthorRepository: Repository<Author>,
    @InjectRepository(Book) private BookRepository: Repository<Book>,
    @InjectRepository(Language)
    private LanguageRepository: Repository<Language>,
    @InjectRepository(Publisher)
    private PublisherRepository: Repository<Publisher>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
    @InjectRepository(UserSituation)
    private UserSituationRepository: Repository<UserSituation>,
    @InjectRepository(BookImages)
    private BookImagesRepository: Repository<BookImages>,
    @InjectRepository(Wish)
    private WishListRepository: Repository<Wish>,
    @InjectRepository(AutoRelationBook)
    private AutoRelationBookRepository: Repository<AutoRelationBook>,
    @InjectRepository(BookCategories)
    private BookCategoriesRepository: Repository<BookCategories>,
  ) {}

  onApplicationBootstrap() {
    this.user = new MysqlUserRepository<User>(this.UserRepository);
    this.personalData = new MysqlPersonalDataRepository<PersonalData>(
      this.PersonalDataRepository,
    );
    this.author = new MysqlAuthorRepository<Author>(this.AuthorRepository);
    this.book = new MysqlBookRepository<Book>(this.BookRepository);
    this.language = new MysqlLanguageRepository<Language>(
      this.LanguageRepository,
    );
    this.publisher = new MysqlPublisherRepository<Publisher>(
      this.PublisherRepository,
    );
    this.category = new MysqlCategoryRepository<Category>(
      this.CategoryRepository,
    );
    this.userSituation = new MysqlUserSituationRepository<UserSituation>(
      this.UserSituationRepository,
    );
    this.bookImages = new MysqlBookImagesRepository<BookImages>(
      this.BookImagesRepository,
    );
    this.wishList = new MysqlWishListRepository<Wish>(this.WishListRepository);
    this.autoRelationBook =
      new MysqlAutoRelationBookRepository<AutoRelationBook>(
        this.AutoRelationBookRepository,
      );
    this.bookCategories = new MysqlBookCategoriesRepository<BookCategories>(
      this.BookCategoriesRepository,
    );
  }
}
