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
    const array = await this._repository.query(`select category.name
    from book_categories
    cross join category
    cross join book
    on book_categories.categoryId = category.id and book.id = book_categories.bookId and book.status = 'Disponível'
    group by book_categories.categoryId;`);

    return array;
  }
}
