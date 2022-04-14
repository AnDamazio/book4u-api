import { ICategoryRepository } from 'src/core';
import { Repository } from 'typeorm';

export class MysqlCategoryRepository<T> implements ICategoryRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  create(category): Promise<T> {
    return this._repository.save(category);
  }

  async findOneByName(category): Promise<T[]> {
    const categories = Promise.all(
      await category.map(async (obj) => {
        return await this._repository.find({ where: { name: obj.name } });
      }),
    );
    return categories;
  }

  async checkIfExists(name: string): Promise<boolean> {
    if ((await this.findOneByName(name)) === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
