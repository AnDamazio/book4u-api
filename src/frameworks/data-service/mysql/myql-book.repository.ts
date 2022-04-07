import { Repository } from 'typeorm';
import { IBookRepository } from 'src/core';

export class MysqlBookRepository<T> implements IBookRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  create(book): Promise<T> {
    return this._repository.save(book);
  }
}
