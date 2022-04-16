export abstract class IUserRepository<T> {
  abstract create(user: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findOneById(id: number): Promise<T>;

  abstract setProfilePic(id: number, fileName: any): Promise<any>

  abstract updateUser(id: number, user: any): Promise<any>

}
