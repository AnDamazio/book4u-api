export abstract class IBookCategoriesRepository<T> {
  abstract saveRelation(book: T): Promise<T>;
  abstract findRegisteredCategories(): Promise<boolean>;
}
