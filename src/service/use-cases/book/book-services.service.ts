import { UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Book } from "../../../core/entities";
import { IDataServices } from "../../../core/abstracts";
import { CreateBookDto } from "../../../core/dtos";
import { BookFactoryService } from "./book-factory.service";

@Injectable()
export class BookServices {
  constructor(
    private bookServices: IDataServices,
    private bookFactoryService: BookFactoryService
  ) {}

  async getAllBooks(id: any): Promise<Book[]> {
    try {
      return await this.bookServices.book.findAll(id);
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
      return await this.bookServices.book.getUserLibrary(id);
    } catch (err) {
      return err.message;
    }
  }

  async findAllBooksInCategory(
    categories: string[],
    id: string
  ): Promise<Book[]> {
    const books = await this.bookServices.book.findBookByCategory(categories);

    return books.filter((obj) => {
      return obj.owner.id != id;
    });
  }

  async updateBook(id: number, book: any): Promise<UpdateResult> {
    try {
      return await this.bookServices.book.updateBook(id, book);
    } catch (err) {
      return err.message;
    }
  }

  async getIdFromBook(book): Promise<number> {
    try {
      return await this.bookServices.book.getIdFromBook(book);
    } catch (err) {
      return err.message;
    }
  }

  async findRecentBooks(dayInterval: number, id): Promise<Book[]> {
    const books = (await this.bookServices.book.findBooksByDate(
      dayInterval
    )) as any;

    return books.filter((obj) => {
      return obj.owner.id != id;
    });
  }

  async findBookByName(title): Promise<Book[]> {
    return await this.bookServices.book.findBookByName(title);
  }

  async findBookByAuthor(name): Promise<Book[]> {
    return await this.bookServices.book.findBookByAuthor(name);
  }
}
