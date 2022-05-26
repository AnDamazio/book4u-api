export abstract class ICategoryRepository<T> {
  abstract findAll(): Promise<T[]>;

  abstract create(category: string): Promise<T>;

  abstract findOneByName(category): Promise<T[]>;

  abstract checkIfExists(category): Promise<boolean>;
}
