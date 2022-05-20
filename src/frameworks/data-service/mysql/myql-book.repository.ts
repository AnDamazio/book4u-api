import { Repository } from 'typeorm';
import { IBookRepository } from 'src/core';

export class MysqlBookRepository<T> implements IBookRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this._repository.find({ relations: ['bookImages', 'owner', 'author', 'language', 'publisher', 'category'] });
  }

  async create(book): Promise<T> {
    return await this._repository.save(book);
  }

  async findBookByPk(id: number): Promise<T> {
    return await this._repository.findOne(id, { relations: ['bookImages'] })
  }

  async getUserLibrary(id: number): Promise<T[]> {
    return await this._repository.find({ where: { owner: id }, relations: ['bookImages', 'owner', 'author', 'language', 'publisher', 'category'] })
  }
}
