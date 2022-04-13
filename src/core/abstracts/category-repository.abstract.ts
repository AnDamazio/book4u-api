export abstract class ICategoryRepository<T> {
  abstract findAll(): Promise<T[]>;

  abstract create(category: string): Promise<T>;

   abstract findOneByName(name: string): Promise<T>;

  abstract checkIfExists(name: string): Promise<boolean>;
}
