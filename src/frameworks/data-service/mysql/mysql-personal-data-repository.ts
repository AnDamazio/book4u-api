import { Repository, UpdateResult } from 'typeorm';
import { IPersonalDataRepository } from 'src/core';

export class MysqlPersonalDataRepository<T>
  implements IPersonalDataRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  create(personalData): Promise<T> {
    return this._repository.save(personalData);
  }

  async findOneByEmail(email: string): Promise<T> {
    try {
      const userData = await this._repository
        .createQueryBuilder('personal_data')
        .where('personal_data.email = :email', { email: email })
        .getOne();
      return userData;
    } catch (error) {
      console.log(error);
    }
  }



  async findOneById(id: number): Promise<T> {
    return await this._repository.findOne({ where: { id: id } });
  }

  async exchangePassword(id: number, newUserPassword: T): Promise<UpdateResult> {
    return await this._repository.update(id, newUserPassword);
  }

  async getIdFromPersonalData(personalData: T): Promise<T> {
    return await this._repository.getId(personalData)
  }

}
