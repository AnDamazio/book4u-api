import { AuthorServices } from '../service/use-cases/author/author-services.service';
import { AuthorFactoryService } from '../service/use-cases/author/author-factory.service';
import { BookServices } from '../service/use-cases/book/book-services.service';
import { BookFactoryService } from '../service/use-cases/book/book-factory.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateBookDto, CreateBookResponseDto } from '../core/dtos';
import { LanguageFactoryService, LanguageServices } from 'src/service/use-cases/language';

@Controller('api/book')
export class BookController {
  constructor(
    private bookServices: BookServices,
    private bookFactoryService: BookFactoryService,
    private authorServices: AuthorServices,
    private authorFactoryService: AuthorFactoryService,
    private languageFactoryService: LanguageFactoryService,
    private languageServices: LanguageServices
  ) {}

  @Post('')
  async createBook(@Body() bookDto: CreateBookDto) {
    const createBookResponse = new CreateBookResponseDto();
    try {
      const author = this.authorFactoryService.createNewAuthor(bookDto.author);
      const createdAuthor = await this.authorServices.createAuthor(author);
      bookDto.author = createdAuthor;

      const language = this.languageFactoryService.createNewLanguage(bookDto.language);
      const createdLanguage = await this.languageServices.createLanguage(language);
      bookDto.language = createdLanguage;

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
    console.log(books);
    return books;
  }
}
