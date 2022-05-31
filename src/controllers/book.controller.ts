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
} from "src/service/use-cases/category";

import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { BookImagesServices } from "src/service/use-cases/bookImages";
import {
  AutoRelationBooksServices,
  BookCategoriesFactoryService,
  UserServices,
} from "src/service";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";
import { AutoRelationBook, EnumUserSituation } from "src/core";
import { string } from "joi";
import { BookCategoriesServices } from "src/service/use-cases/book-categories/book-categories-services.service";
import * as jwt from "jsonwebtoken";

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

      bookDto.createdAt = String(Date.now());
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

  @Get("list")
  async bookList() {
    const books = await this.bookServices.getAllBooks();
    return books;
  }

  @Put("sendBookImage/:id")
  @UseInterceptors(AnyFilesInterceptor())
  async updateBookImage(
    @Param("id") id: number,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    try {
      const bookFound = await this.bookServices.findBookByPk(id);
      const idFromBookImage = await this.bookImagesServices.getIdFromBookImages(
        bookFound.bookImages
      );
      const [file0, file1, file2, file3] = files;
      bookFound.bookImages.frontSideImage =
        Math.floor(Math.random() * 65536) + "_" + file0.originalname;
      bookFound.bookImages.rightSideImage =
        Math.floor(Math.random() * 65536) + "_" + file1.originalname;
      bookFound.bookImages.leftSideImage =
        Math.floor(Math.random() * 65536) + "_" + file2.originalname;
      bookFound.bookImages.backSideImage =
        Math.floor(Math.random() * 65536) + "_" + file3.originalname;

      const fileNames = [
        bookFound.bookImages.frontSideImage,
        bookFound.bookImages.rightSideImage,
        bookFound.bookImages.leftSideImage,
        bookFound.bookImages.backSideImage,
      ];

      const filesURL = [];

      for (let value = 0; value <= 3; value++) {
        const fileRef = ref(storage, fileNames[value]);
        await uploadBytes(fileRef, files[value].buffer).then(() => {});
        await getDownloadURL(fileRef).then((url) => {
          filesURL.push(url);
          if (value === fileNames.length - 1) {
            bookFound.bookImages.frontSideImage = filesURL[0];
            bookFound.bookImages.rightSideImage = filesURL[1];
            bookFound.bookImages.leftSideImage = filesURL[2];
            bookFound.bookImages.backSideImage = filesURL[3];
            this.bookImagesServices.updateBookImages(
              Number(idFromBookImage),
              bookFound.bookImages
            );
          }
        });
      }
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

  @Post("exchangeBook/:book1/:book2")
  async createExchangeBooks(
    @Param("book1") book1: number,
    @Param("book2") book2: number
  ) {
    try {
      const getBook1 = await this.bookServices.findBookByPk(book1);
      const getBook2 = await this.bookServices.findBookByPk(book2);

      const createExchangeBooksDto = {
        situation: ExchangeSituation.PENDENTE,
        book1: getBook1,
        book2: getBook2,
      };

      getBook1.status = "Indisponível";
      getBook2.status = "Indisponível";

      await this.bookServices.updateBook(book2, getBook2);

      this.autoRelationBooksServices.createExchangeBooks(
        createExchangeBooksDto
      );
      return "Proposta de troca enviada";
    } catch (err) {
      return err.message;
    }
  }

  @Get("tradeNotification/:id")
  async createNotificationById(@Param("id") id: number) {
    try {
      return await this.autoRelationBooksServices.exchangeNotification(id);
    } catch (err) {
      return err.message;
    }
  }

  @Get("get-books-in/:category")
  async a(@Param("category") category: string) {
    return await this.bookServices.findAllBooksInCategory([category]);
  }
}
