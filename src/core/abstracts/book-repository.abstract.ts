export abstract class IBookRepository<T> {
  abstract create(book: T): Promise<T>;

  abstract findAll(): Promise<T[]>;
}
