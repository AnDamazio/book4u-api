import { createQueryBuilder, Repository } from 'typeorm';
import { IBookRepository } from 'src/core';
import { CreateBookDto } from 'src/core';
/* import { BookServices } from 'src/service'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './model';

export class MysqlBookRepository<T> implements IBookRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
    
  findAll(): Promise<T[]> {
    return this._repository.find();
    }

/*   findOneById(id: number): Promise<T> {
    return this._repository.findOne();
  }
 */
  create(book): Promise<T> {
    return this._repository.save(book);
  }
}