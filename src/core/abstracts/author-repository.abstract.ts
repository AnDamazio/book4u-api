export abstract class IAuthorRepository<T> {
  abstract create(author: T): Promise<T>;

  abstract findAll(): Promise<T[]>;
}
