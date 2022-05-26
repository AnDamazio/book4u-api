import { ILanguageRepository } from 'src/core';
import { Repository } from 'typeorm';

export class MysqlLanguageRepository<T> implements ILanguageRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  async findOneByName(name: string): Promise<T> {
    return await this._repository.findOne({ where: { name: name } });
  }

  async checkIfExists(name: string): Promise<boolean> {
    if ((await this.findOneByName(name)) === undefined) {
      return true;
    } else {
      return false;
    }
  }

  create(language): Promise<T> {
    return this._repository.save(language);
  }
}
