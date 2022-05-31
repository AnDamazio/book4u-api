import { BookCategories } from "../entities";
import { UpdateResult } from "typeorm";

export abstract class IBookRepository<T> {
  abstract create(book: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findBookByPk(id: number): Promise<T>;

  abstract getUserLibrary(id: number): Promise<T[]>;

  abstract getIdFromBook(book: T): Promise<number>

  abstract findBookByCategory(categories: string[]): Promise<any[]>;

  abstract updateBook(id: number, book: T): Promise<UpdateResult>;

  abstract findBooksByDate(dayInterval: number): Promise<T[]>;
}
