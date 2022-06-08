<<<<<<< HEAD
import { UpdateResult } from "typeorm";

export abstract class IRequestRepository<T> {
    abstract createExchangeBooks(book: T): Promise<T>

    abstract updateExchangeBooks(id: number, book: T): Promise<UpdateResult>

    abstract exchangeNotification(token: string): Promise<T>

    abstract getIdFromExchangeBook(exchange: T): Promise<T>

    abstract findExchangeById(id: number): Promise<T>

}
=======
export abstract class IRequestRepository<T> {
  abstract create(request: T): Promise<T>;

  abstract findAllRequest(id: string): Promise<T[]>;

  abstract deleteRequest(id: string): Promise<any>;
}
>>>>>>> 0587f5a94a366ffcb70a7556f72868f380c5b4be
