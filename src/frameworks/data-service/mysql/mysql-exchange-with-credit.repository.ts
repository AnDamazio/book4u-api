import { Repository, UpdateResult } from 'typeorm';
import { IExchangeWithCreditRepository } from '../../../core'

export class MysqlExchangeWithCreditRepository<T> implements IExchangeWithCreditRepository<T> {
    private _repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this._repository = repository;
    }

    async createExchangeWithCredit(exchange): Promise<T> {
        return await this._repository.save(exchange)
    }

    async exchangeNotificationBuyer(token: string): Promise<T[]> {
        return await this._repository.find({
            relations: ['user', 'user.personalData', 'book', 'book.owner', 'book.bookImages', 'book.owner.personalData', 'book.author'],
            where: { user: { personalData: { token: token } } }
        })
    }

    async exchangeNotificationOwner(token: string): Promise<T[]> {
        return await this._repository.find({
            relations: ['user', 'user.personalData', 'book', 'book.owner', 'book.bookImages', 'book.owner.personalData', 'book.author'],
            where: { book: { owner: { personalData: { token: token } } } }
        })
    }

    async updateExchangeBooks(id: number, exchange): Promise<UpdateResult> {
        return await this._repository.update(id, exchange);
    }

    async getIdByExchange(exchange): Promise<Number> {
        return await this._repository.getId(exchange)
    }

    async findCreditExchangeById(id: number): Promise<T> {
        return await this._repository.findOne({
            relations: ['user', 'user.personalData', 'book', 'book.owner', 'book.bookImages', 'book.author'],
            where: { id: id }
        })
    }
}
