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

    async exchangeNotification(token: string): Promise<T> {
        return await this._repository.findOne({
            relations: ['book2', 'book1', 'book2.owner', 'book1.owner', 'book2.owner.personalData', 'book1.owner.personalData'],
            where: { book2: { owner: { personalData: { token: token } } } }
        })
    }

    async getIdFromExchangeBook(exchange: T): Promise<T> {
        return await this._repository.getId(exchange)
    }

    async findExchangeById(id: number): Promise<T> {
        return await this._repository.findOne(id, { relations: ['book2', 'book1', 'book2.owner', 'book1.owner'] })
    }
}