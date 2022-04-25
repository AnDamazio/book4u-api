import {
  AuthorServices,
  AuthorFactoryService,
} from '../service/use-cases/author/';
import { BookServices, BookFactoryService } from '../service/use-cases/book/';
import { Controller, Post, Body, Get } from '@nestjs/common';
import {
  PublisherFactoryService,
  PublisherServices,
} from 'src/service/use-cases/publisher';
import { CreateBookDto, CreateBookResponseDto } from '../core/dtos';
import {
  LanguageFactoryService,
  LanguageServices,
} from 'src/service/use-cases/language';
import {
  CategoryFactoryService,
  CategoryServices,
} from 'src/service/use-cases/category';

@Controller('api/book')
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
    private categoryFactoryService: CategoryFactoryService,
    private categoryServices: CategoryServices,
  ) { }

  @Post()
  async createBook(@Body() bookDto: CreateBookDto) {
    const createBookResponse = new CreateBookResponseDto();
    try {
      const author = this.authorFactoryService.createNewAuthor(bookDto.author);
      const createdAuthor = await this.authorServices.createAuthor(author);
      bookDto.author = createdAuthor;

      const language = this.languageFactoryService.createNewLanguage(
        bookDto.language,
      );
      const createdLanguage = await this.languageServices.createLanguage(
        language,
      );
      bookDto.language = createdLanguage;

      const publisher = this.publisherFactoryService.createNewPublisher(
        bookDto.publisher,
      );
      const createdPublisher = await this.publisherServices.createPublisher(
        publisher,
      );
      bookDto.publisher = createdPublisher;

      const category = await this.categoryServices.getCategory(
        bookDto.category,
      );
      bookDto.category = category;
      console.log(category);
      console.log(createdLanguage);

      const book = this.bookFactoryService.createNewBook(bookDto);
      const createdBook = await this.bookServices.createBook(book);
      createBookResponse.success = true;
      createBookResponse.createdBook = createdBook;
    } catch (error) {
      console.log(error);
      createBookResponse.success = false;
    }
    return createBookResponse;
  }

  @Get('list')
  async userList() {
    const books = await this.bookServices.getAllBooks();
    return books;
  }
}
