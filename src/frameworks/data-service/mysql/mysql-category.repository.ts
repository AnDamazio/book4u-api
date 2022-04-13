import { ICategoryRepository } from 'src/core';
import { EntityManager, Repository } from 'typeorm';
import { Category } from './model/category.model'

export class MysqlCategoryRepository<T> implements ICategoryRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  create(category): Promise<T>{
    return this._repository.save(category)
  }

  findOneByName(name: string): Promise<T> {
    return this._repository.findOne({ where: { name: name } });
  }

  async checkIfExists(name: string): Promise<boolean> {
    if ((await this.findOneByName(name)) === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
