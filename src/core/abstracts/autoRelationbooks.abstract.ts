import { UpdateResult } from "typeorm";

export abstract class IAutoRelationBookRepository<T> {
    abstract createExchangeBooks(book: T): Promise<T>

    abstract createExchangeBooks2(id: number, book: T): Promise<UpdateResult>
}