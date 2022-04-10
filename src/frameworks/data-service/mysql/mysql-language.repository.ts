import { ILanguageRepository } from 'src/core';
import { Repository } from 'typeorm';

export class MysqlLanguageRepository<T> implements ILanguageRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  async findOneByName(name: string): Promise<T>{
    let a = await this._repository.findOne({where: {name: name}}) 
    return a
  }

  checkIfExists(name: string): boolean {
    let find = this.findOneByName(name);
    if ( find == undefined ) {
      return false;
    } else {
      return true;
    }
  }

  create(language): Promise<T> {
    return this._repository.save(language);
  }
}
