import { UpdateResult } from "typeorm";

export abstract class IBookImagesRepository<T> {
    abstract create(bookImages: T): Promise<T>;

    abstract findAll(): Promise<T[]>;

    abstract updateBookImages(id: number, bookFound: any): Promise<UpdateResult>

    abstract getIdFromBookImages(bookImages: T): Promise<T>
}
