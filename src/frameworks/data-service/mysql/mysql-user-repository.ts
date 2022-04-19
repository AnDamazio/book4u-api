import { Repository } from 'typeorm';
import { IUserRepository } from 'src/core';

export class MysqlUserRepository<T> implements IUserRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  findOneById(id: number): Promise<T> {
    return this._repository.findOne(id);
  }

  create(user): Promise<T> {
    return this._repository.save(user);
  }

  async setProfilePic(id: number, fileName: any): Promise<any> {
    return await this._repository.update(id, fileName)
  }

}