import { UpdateResult } from "typeorm";

export abstract class IRequestRepository<T> {
  abstract createExchangeBooks(book: T): Promise<T>

  abstract updateExchangeBooks(id: number, book: T): Promise<UpdateResult>

  abstract exchangeNotificationOwner1(token: string): Promise<T[]>

  abstract exchangeNotificationOwner2(token: string): Promise<T[]>

  abstract getIdFromExchangeBook(exchange: T): Promise<T>

  abstract findExchangeById(id: number): Promise<T>

  abstract findAll(): Promise<T[]>

}
