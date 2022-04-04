export abstract class IUserRepository<T> {
  abstract create(user: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findOneById(id: number): Promise<T>;
}
