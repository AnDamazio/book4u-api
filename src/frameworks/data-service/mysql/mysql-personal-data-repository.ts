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
    console.log(personalData);
    return this._repository.save(personalData);
  }
}
