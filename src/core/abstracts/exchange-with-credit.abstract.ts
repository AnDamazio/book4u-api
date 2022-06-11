import { UpdateResult } from "typeorm";

export abstract class IExchangeWithCreditRepository<T>{
    abstract createExchangeWithCredit(exchange: T): Promise<T>

    abstract getIdByExchange(exchange: T): Promise<Number>

    abstract updateExchangeBooks(id: number, exchange: T): Promise<UpdateResult>

    abstract exchangeNotificationBuyer(token: string): Promise<T[]>

    abstract exchangeNotificationOwner(token: string): Promise<T[]>

    abstract findCreditExchangeById(id: number): Promise<T>
}