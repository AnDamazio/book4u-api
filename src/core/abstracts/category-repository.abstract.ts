export abstract class ICategoryRepository<T> {
  abstract findAll(): Promise<T[]>;
}
