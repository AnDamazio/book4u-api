import { ICategoryRepository } from 'src/core';
import { Repository } from 'typeorm';

export class MysqlCategoryRepository<T> implements ICategoryRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }
}
