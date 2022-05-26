import { IBookImagesRepository } from 'src/core';
import { Repository, UpdateResult } from 'typeorm';
import { BookImages } from './model';

export class MysqlBookImagesRepository<T> implements IBookImagesRepository<T> {
    private _repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this._repository = repository;
    }

    async create(bookImages): Promise<T> {
        return await this._repository.save(bookImages);
    }

    async findAll(): Promise<T[]> {
        return await this._repository.find()
    }

    async updateBookImages(id: number, bookFound: any): Promise<UpdateResult> {
        return await this._repository.update(id, bookFound);
    }

    async getIdFromBookImages(bookImages: T): Promise<T> {
        return await this._repository.getId(bookImages)
    }

}