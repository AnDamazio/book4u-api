import { Repository, UpdateResult } from 'typeorm';
import { IRequestRepository } from 'src/core';

export class MysqlRequestRepository<T> implements IRequestRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async createExchangeBooks(book): Promise<T> {
    return await this._repository.save(book)
  }

  async updateExchangeBooks(id: number, book): Promise<UpdateResult> {
    return await this._repository.update(id, book)
  }

  async exchangeNotificationOwner1(token: string): Promise<T[]> {
    return await this._repository.find({
      relations: ['book2', 'book1', 'book2.owner', 'book1.owner', 'book1.owner.personalData', 'book1.bookImages', 'book2.bookImages', 'book1.author', 'book2.author'],
      where: { book1: { owner: { personalData: { token: token } } } }
    })
  }

  async exchangeNotificationOwner2(token: string): Promise<T[]> {
    return await this._repository.find({
      relations: ['book2', 'book1', 'book2.owner', 'book1.owner', 'book2.owner.personalData', 'book1.bookImages', 'book2.bookImages', 'book1.author', 'book2.author'],
      where: { book2: { owner: { personalData: { token: token } } }, situation: 'Pendente' }
    })
  }

  async getIdFromExchangeBook(exchange: T): Promise<T> {
    return await this._repository.getId(exchange)
  }

  async findExchangeById(id: number): Promise<T> {
    return await this._repository.findOne(id, { relations: ['book2', 'book1', 'book2.owner', 'book1.owner', 'book1.bookImages', 'book2.bookImages', 'book1.author', 'book2.author', 'book1.owner.personalData'] })
  }

  async findAll(): Promise<T[]> {
    return await this._repository.find({ relations: ['book2', 'book1'] })
  }
}
