import { Repository } from 'typeorm';
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
        .leftJoinAndSelect('personal_data.user', 'user')
        .where('personal_data.email = :email', { email: email })
        .getOne();
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
}
