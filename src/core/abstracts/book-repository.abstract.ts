import { UpdateResult } from "typeorm";

export abstract class IBookRepository<T> {
  abstract create(book: T): Promise<T>;

  abstract findAll(id: number): Promise<T[]>;

  abstract findBookByPk(id: number): Promise<T>;

  abstract getUserLibrary(id: number): Promise<T[]>;

  abstract getIdFromBook(book: T): Promise<number>;

  abstract findBookByCategory(categories: string[]): Promise<any[]>;

  abstract updateBook(id: number, book: any): Promise<UpdateResult>;

  abstract findBooksByDate(dayInterval: number): Promise<T[]>;

  abstract findBookByName(title: string): Promise<T[]>;

  abstract findBookByAuthor(name: string): Promise<T[]>;

}
