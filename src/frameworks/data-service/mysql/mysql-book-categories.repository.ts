import { IBookCategoriesRepository } from "src/core/abstracts/book-categories.abstract";
import { Repository } from "typeorm";

export class MysqlBookCategoriesRepository<T>
  implements IBookCategoriesRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async saveRelation(book): Promise<T> {
    return await this._repository.save(book);
  }

  async findRegisteredCategories(): Promise<any> {

    const array = await this._repository
      .createQueryBuilder("book_categories")
      .leftJoinAndSelect("book_categories.category", "category")
      .select("category.name")
      .groupBy("book_categories.category")
      .getRawMany();

    return array;
  }
}
