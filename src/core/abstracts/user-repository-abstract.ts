export abstract class IUserRepository<T> {
  abstract create(user: T): Promise<T>;

  abstract getAll(): Promise<T[]>

  abstract getOne(id: number): Promise<T>
}
