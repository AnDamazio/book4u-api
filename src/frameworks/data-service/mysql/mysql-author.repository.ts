import { Repository } from 'typeorm';

export class MysqlAuthorRepository<T>{
    private _repository: Repository<T>;
  
    constructor(repository: Repository<T>) {
      this._repository = repository;
    }
  
    findAll(): Promise<T[]> {
      return this._repository.find();
    }
  
   /*  findOneById(id: number): Promise<T> {
      return this._repository.findOne();
    } */
  
    create(author): Promise<T> {
      return this._repository.save(author);
    }
  }