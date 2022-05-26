import { IWishListRepository } from 'src/core';
import { Repository } from 'typeorm';

export class MysqlWishListRepository<T> implements IWishListRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async create(wish): Promise<T> {
    return await this._repository.save(wish);
  }

  remove(id): any {
    return this._repository.delete(id);
  }
}
