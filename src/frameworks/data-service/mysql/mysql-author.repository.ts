import { IAuthorRepository } from 'src/core';
import { Repository } from 'typeorm';

export class MysqlAuthorRepository<T> implements IAuthorRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  create(author): Promise<T> {
    return this._repository.save(author);
  }
}
