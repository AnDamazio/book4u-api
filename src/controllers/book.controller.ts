import { ExchangeSituation } from "./../core/enums/exchange-situation.enum";
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
  UseInterceptors,
  Param,
  UploadedFiles,
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
  CreateExchangeBooksDto,
} from "../core/dtos";
import {
  LanguageFactoryService,
  LanguageServices,
} from "src/service/use-cases/language";
import {
  CategoryFactoryService,
  CategoryServices,
} from 'src/service/use-cases/category';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { BookImagesServices } from 'src/service/use-cases/bookImages';
import { AutoRelationBooksServices, BookCategoriesFactoryService, BookCategoriesServices, UserServices } from 'src/service';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken'
import { Status } from 'src/core';

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
    private userServices: UserServices,
    private autoRelationBooksServices: AutoRelationBooksServices
  ) { }

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
      return err.message
    }
  }

  @Get("list-recent-books/:daysInterval")
  async getRecentBooks(@Param("daysInterval") daysInterval: number) {
    return await this.bookServices.findRecentBooks(daysInterval);
  }

  @Put("sendBookImage/:id")
  async updateBookImage(@Body() bookImages: CreateBookImagesDto, @Param("id") id: number,
  ) {
    try {
      const bookFound = await this.bookServices.findBookByPk(id);
      const idFromBookImage = await this.bookImagesServices.getIdFromBookImages(bookFound.bookImages);
      bookFound.bookImages.backSideImage = bookImages.backSideImage;
      bookFound.bookImages.frontSideImage = bookImages.frontSideImage;
      bookFound.bookImages.leftSideImage = bookImages.leftSideImage;
      bookFound.bookImages.rightSideImage = bookImages.rightSideImage;
      await this.bookImagesServices.updateBookImages(Number(idFromBookImage), bookFound.bookImages);
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

  @Post("exchangeBookWithBook/:book1/:book2")
  async createExchangeBooks(
    @Param("book1") book1: number,
    @Param("book2") book2: number
  ) {
    try {
      const getBook1 = await this.bookServices.findBookByPk(book1);
      const getBook2 = await this.bookServices.findBookByPk(book2);
      if (getBook1.price === getBook2.price) {
        const createExchangeBooksDto = {
          situation: ExchangeSituation.PENDENTE,
          book1: getBook1,
          book2: getBook2,
          createdAt: String(Date.now()),
        };
        getBook1.status = "Indisponível";
        await this.bookServices.updateBook(book1, getBook1);
        await this.bookServices.updateBook(book2, getBook2);
        const getIdFromExchange =
          await this.autoRelationBooksServices.createExchangeBooks(
            createExchangeBooksDto
          );
        return {
          text: "Proposta de troca enviada",
          idFromExchange:
            await this.autoRelationBooksServices.getIdFromExchange(
              getIdFromExchange
            ),
        };
      } else {
        return "Existe uma diferença de preço";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Put("confirmExchangeBook/:id/:confirm")
  async confirmExchangeBook(
    @Param("confirm") confirm: string,
    @Param("id") id: number
  ) {
    try {
      if (confirm === "Confirmado") {
        const findedAutoRelation =
          await this.autoRelationBooksServices.findExchangeById(id);
        findedAutoRelation.situation = ExchangeSituation.CONFIRMADO;
        findedAutoRelation.book2.status = Status.INDISPONIVEL;
        const bookId = await this.bookServices.getIdFromBook(
          findedAutoRelation.book2
        );
        await this.bookServices.updateBook(bookId, findedAutoRelation.book2);
        await this.autoRelationBooksServices.updateExchangeBooks(
          id,
          findedAutoRelation
        );
        return "Troca confirmada";
      } else if (confirm === "Recusado") {
        const findedAutoRelation =
          await this.autoRelationBooksServices.findExchangeById(id);
        findedAutoRelation.situation = ExchangeSituation.RECUSADO;
        await this.autoRelationBooksServices.updateExchangeBooks(
          id,
          findedAutoRelation
        );
        return "Troca Recusada";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Get("tradeNotification/:token")
  async createNotificationByToken(@Param("token") token: string) {
    try {
      const findNotification =
        await this.autoRelationBooksServices.exchangeNotification(token);
      if (findNotification) {
        return {
          text: `O usuário ${findNotification.book1.owner.firstName} deseja realizar uma troca`,
          user1Book: findNotification.book1,
          user2Book: findNotification.book2,
        };
      } else {
        return "Sem notificações";
      }
    } catch (err) {
      return err.message;
    }
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
}
