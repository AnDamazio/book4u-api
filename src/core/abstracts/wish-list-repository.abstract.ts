export abstract class IWishListRepository<T> {
  abstract create(wish: T): Promise<T>;

  abstract remove(id: string): any;

  abstract findAll(id: string): Promise<T[]>;

}
