export abstract class IBookCategoriesRepository<T> {
  abstract saveRelation(book: T): Promise<T>;
}
