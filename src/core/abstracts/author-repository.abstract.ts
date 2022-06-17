export abstract class IAuthorRepository<T> {
  abstract create(author: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findOneByName(name: string): Promise<T>;

  abstract checkIfExists(name: string): Promise<boolean>;

}
