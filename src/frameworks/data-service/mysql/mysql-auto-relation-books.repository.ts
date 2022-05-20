import { Repository, UpdateResult } from 'typeorm';
import { IAutoRelationBookRepository } from 'src/core';

export class MysqlAutoRelationBookRepository<T> implements IAutoRelationBookRepository<T> {
    private _repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this._repository = repository;
    }

    async createExchangeBooks(book): Promise<T> {
        return await this._repository.save(book)
    }

    async createExchangeBooks2(id: number, book: T): Promise<UpdateResult> {
        return await this._repository.update(id, book)
    }
}