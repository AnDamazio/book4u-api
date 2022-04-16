import { Repository, UpdateResult } from 'typeorm';
import { IUserRepository, User } from 'src/core';

export class MysqlUserRepository<T> implements IUserRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  findOneById(id: number): Promise<T> {
    return this._repository.findOne();
  }

  create(user): Promise<T> {
    return this._repository.save(user);
  }

  async setProfilePic(id: number, fileName: any): Promise<any> {
    return await this._repository.update(id, fileName)
  }

  async updateUser(id: number, user): Promise<any> {
    const updateUser = await this._repository.update(id, user)
    return updateUser
  }
}