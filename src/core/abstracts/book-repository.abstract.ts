import { UpdateResult } from 'typeorm';

export abstract class IBookRepository<T> {
  abstract create(book: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findBookByPk(id: number): Promise<T>

  abstract getUserLibrary(id: number): Promise<T[]>

  abstract updateBook(id: number, book: T): Promise<UpdateResult>
}
