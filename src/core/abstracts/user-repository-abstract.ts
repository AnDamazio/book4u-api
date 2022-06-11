import { UpdateResult } from "typeorm";

export abstract class IUserRepository<T> {
  abstract create(user: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findOneById(id: number): Promise<T>;

  abstract findOneByNRegister(registerNumber: string): Promise<T>;

  abstract setProfilePic(id: number, fileName: any): Promise<any>

  abstract updateSituationUser(id: number, newUser: T): Promise<UpdateResult | Error>

  abstract getIdFromUser(user: T): Promise<Number | String>;

  abstract findOneByEmail(email: string): Promise<T>;

  abstract updateUser(id: number, newUser: T): Promise<UpdateResult>;

}
