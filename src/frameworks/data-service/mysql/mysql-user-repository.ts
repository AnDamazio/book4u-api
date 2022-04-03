import { Repository } from 'typeorm';
import { CreateUserDto, IUserRepository } from 'src/core';

export class MysqlUserRepository<T> implements IUserRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAll(): Promise<T[]> {
    return this._repository.find();
  }

  getOne(id: number): Promise<T> {
    return this._repository.findOne();
  }

  create(user): Promise<T> {
    return this._repository.save(user);
  }
}
