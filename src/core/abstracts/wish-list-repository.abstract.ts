export abstract class IWishListRepository<T> {
  abstract create(wish: T): Promise<any>;

  abstract remove(id: string): any;

  abstract findAll(id: string): Promise<T[]>;
}
