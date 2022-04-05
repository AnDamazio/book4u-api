import { Injectable } from '@nestjs/common';
import { Book } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateBookDto } from '../../../core/dtos';
import { BookFactoryService } from './book-factory.service';

@Injectable()
export class BookServices {
  constructor(
    private bookServices: IDataServices,
    private bookFactoryService: BookFactoryService,
  ) {}

  getAllBooks(): Promise<Book[]> {
    return this.bookServices.book.findAll();
  }

/*   getBookById(id: any): Promise<Book> {
    return this.bookServices.book.findOneById(id);
  } */

  createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookFactoryService.createNewBook(createBookDto);
    return this.bookServices.book.create(book);
  }
}
