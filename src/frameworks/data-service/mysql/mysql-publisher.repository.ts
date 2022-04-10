import { Repository } from 'typeorm';
import { IPublisherRepository } from 'src/core';

export class MysqlPublisherRepository<T> implements IPublisherRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  create(publisher): Promise<T> {
    return this._repository.save(publisher);
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  findOneByName(name: string): Promise<T> {
    return this._repository.findOne({ where: { name: name } });
  }

  async checkIfExists(name: string): Promise<boolean> {
    if (this.findOneByName(name) === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
