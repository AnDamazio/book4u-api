import {
  AuthorServices,
  AuthorFactoryService,
} from "../service/use-cases/author/";
import { BookServices, BookFactoryService } from "../service/use-cases/book/";
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  UseGuards,
} from "@nestjs/common";
import {
  PublisherFactoryService,
  PublisherServices,
} from "src/service/use-cases/publisher";
import {
  CreateBookDto,
  CreateBookImagesDto,
  CreateBookResponseDto,
  PartialBookDto,
} from "../core/dtos";
import {
  LanguageFactoryService,
  LanguageServices,
} from "src/service/use-cases/language";
import {
  CategoryFactoryService,
  CategoryServices,
} from "src/service/use-cases/category";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { BookImagesServices } from "src/service/use-cases/bookImages";
import {
  BookCategoriesFactoryService,
  BookCategoriesServices,
  RequestServices,
  UserServices,
} from "src/service";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";
import * as jwt from "jsonwebtoken";
import { Status } from "src/core";

@Controller("api/book")
@UseGuards(JwtAuthGuard)
export class BookController {
  constructor(
    private bookServices: BookServices,
    private bookFactoryService: BookFactoryService,
    private authorServices: AuthorServices,
    private authorFactoryService: AuthorFactoryService,
    private languageFactoryService: LanguageFactoryService,
    private languageServices: LanguageServices,
    private publisherFactoryService: PublisherFactoryService,
    private publisherServices: PublisherServices,
    private categoryServices: CategoryServices,
    private bookCategoriesFactoryService: BookCategoriesFactoryService,
    private bookCategoriesServices: BookCategoriesServices,
    private bookImagesServices: BookImagesServices,
    private userServices: UserServices
  ) {}

  @Post(":token")
  async createBook(
    @Body() bookDto: CreateBookDto,
    @Param("token") token: string
  ) {
    const createBookResponse = new CreateBookResponseDto();
    try {
      const author = this.authorFactoryService.createNewAuthor(bookDto.author);
      const createdAuthor = await this.authorServices.createAuthor(author);
      bookDto.author = createdAuthor;

      const language = this.languageFactoryService.createNewLanguage(
        bookDto.language
      );
      const createdLanguage = await this.languageServices.createLanguage(
        language
      );
      bookDto.language = createdLanguage;

      const publisher = this.publisherFactoryService.createNewPublisher(
        bookDto.publisher
      );
      const createdPublisher = await this.publisherServices.createPublisher(
        publisher
      );
      bookDto.publisher = createdPublisher;
      const category = await this.categoryServices.getCategory(
        bookDto.category
      );

      const destructToken: any = jwt.decode(token);
      const user = await this.userServices.findByEmail(destructToken.email);
      const id = await this.userServices.getIdFromUser(user);

      const owner = await this.userServices.getUserById(id);
      bookDto.owner = owner;

      const date = new Date().toLocaleDateString();
      const day = date.slice(0, 2);
      const month = date.slice(3, 5);
      const year = date.slice(6, 10);

      bookDto.createdAt = `${year}-${month}-${day}`;
      const book = this.bookFactoryService.createNewBook(bookDto);
      const createdBook = await this.bookServices.createBook(book);

      createBookResponse.success = true;
      createBookResponse.createdBook = createdBook;
      const categoriesArray = [];
      for (let i = 0; i < category.length; i++) {
        const categories = this.bookCategoriesFactoryService.createNewCategory({
          book: { ...createdBook },
          category: category[i],
        });

        categoriesArray.push(
          await this.bookCategoriesServices.saveBookCategories(categories)
        );
      }
    } catch (err) {
      createBookResponse.success = false;
      return err;
    }
    return createBookResponse;
  }

  @Get("list/:token")
  async bookList(@Param("token") token: string) {
    try {
      const destructToken: any = jwt.decode(token);
      const user = await this.userServices.findByEmail(destructToken.email);
      const id = await this.userServices.getIdFromUser(user);
      const books = await this.bookServices.getAllBooks(id);
      return books;
    } catch (err) {
      return err.message;
    }
  }

  @Get("list-recent-books/:daysInterval/:token")
  async getRecentBooks(
    @Param("daysInterval") daysInterval: number,
    @Param("token") token: string
  ) {
    const destructToken: any = jwt.decode(token);
    const user = await this.userServices.findByEmail(destructToken.email);
    const id = await this.userServices.getIdFromUser(user);
    return await this.bookServices.findRecentBooks(daysInterval, id);
  }

  @Put("sendBookImage/:id")
  async updateBookImage(
    @Body() bookImages: CreateBookImagesDto,
    @Param("id") id: number
  ) {
    try {
      const bookFound = await this.bookServices.findBookByPk(id);
      const idFromBookImage = await this.bookImagesServices.getIdFromBookImages(
        bookFound.bookImages
      );
      bookFound.bookImages.backSideImage = bookImages.backSideImage;
      bookFound.bookImages.frontSideImage = bookImages.frontSideImage;
      bookFound.bookImages.leftSideImage = bookImages.leftSideImage;
      bookFound.bookImages.rightSideImage = bookImages.rightSideImage;
      await this.bookImagesServices.updateBookImages(
        Number(idFromBookImage),
        bookFound.bookImages
      );
      return `Imagens inseridas com sucesso!`;
    } catch (err) {
      return err.message;
    }
  }

  @Get("userLibrary/:token")
  async getUserLibrary(@Param("token") token: string) {
    const destructToken: any = jwt.decode(token);
    const user = await this.userServices.findByEmail(destructToken.email);
    const id = await this.userServices.getIdFromUser(user);
    return await this.bookServices.getUserLibrary(Number(id));
  }

  @Get("get-books-in/:category/:token")
  async a(@Param("category") category: string, @Param("token") token: string) {
    const destructToken: any = jwt.decode(token);
    const user = await this.userServices.findByEmail(destructToken.email);
    const id = await this.userServices.getIdFromUser(user);

    return await this.bookServices.findAllBooksInCategory(
      [category],
      id as unknown as string
    );
  }

  @Get("get-books-named/:title")
  async getBooksByName(@Param("title") title: string) {
    return await this.bookServices.findBookByName(title);
  }

  @Get("get-book-by-author/:author")
  async getBooksByAuthor(@Param("author") author: string) {
    return await this.bookServices.findBookByAuthor(author);
  }

  @Post("update/:id")
  async updateBookData(
    @Param("id") id: number,
    @Body() partialBookDto: PartialBookDto
  ) {
    const { category, author, language, publisher, ...partialBook } =
      partialBookDto;
    const keyNames = Object.keys(partialBook);
    const book = await this.bookServices.findBookByPk(id);

    keyNames.forEach((element) => {
      if (
        partialBook[element] == null ||
        partialBook[element] == undefined ||
        partialBook[element] == ""
      ) {
        partialBook[element] = book[element];
      }
    });
    try {
      await this.bookServices.updateBook(id, partialBook);
      return true;
    } catch (error) {
      return false;
    }
  }
}
