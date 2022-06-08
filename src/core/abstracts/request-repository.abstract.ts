import { UpdateResult } from "typeorm";

export abstract class IRequestRepository<T> {
    abstract createExchangeBooks(book: T): Promise<T>

    abstract updateExchangeBooks(id: number, book: T): Promise<UpdateResult>

    abstract exchangeNotification(token: string): Promise<T>

    abstract getIdFromExchangeBook(exchange: T): Promise<T>

    abstract findExchangeById(id: number): Promise<T>

}