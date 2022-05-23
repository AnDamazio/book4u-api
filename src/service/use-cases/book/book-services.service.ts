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

  async getAllBooks(): Promise<Book[]> {
    try {
      return await this.bookServices.book.findAll();
    } catch (err) {
      return err.message;
    }
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookFactoryService.createNewBook(createBookDto);
      return await this.bookServices.book.create(book);
    } catch (err) {
      return err.message;
    }
  }

  async findBookByPk(id: number): Promise<Book> {
    try {
      return await this.bookServices.book.findBookByPk(id);
    } catch (err) {
      return err.message;
    }
  }

  async getUserLibrary(id: number): Promise<Book[]> {
    try {
      return await this.bookServices.book.getUserLibrary(id)
    } catch (err) {
      return err.message
    }
  }
}
