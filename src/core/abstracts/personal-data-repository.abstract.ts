import { UpdateResult } from 'typeorm';

export abstract class IPersonalDataRepository<T> {
  abstract create(personalData: T): Promise<T>;

  abstract findOneById(id: number): Promise<T>;

  abstract findOneByEmail(email: string): Promise<T>;

  abstract findUserDataByEmail(email: string): Promise<T>;

  abstract exchangePassword(
    id: number,
    newPasswordUser: T,
  ): Promise<UpdateResult | Error>;

  abstract getIdFromPersonalData(personalData: T): Promise<T>;

  abstract insertToken(id: number, newUserToken: T): Promise<UpdateResult>

  abstract findToken(oldToken: string): Promise<T>

  abstract createAddress(location): Promise<any>;
}
