import { Repository, UpdateResult } from "typeorm";
import { IBookRepository } from "src/core";
import { CreateBookCategoriesDto } from "src/core/dtos/book-categories.dto";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class MysqlBookRepository<T> implements IBookRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this._repository.find({
      relations: ["bookImages", "owner", "author", "language", "publisher"],
    });
  }

  async create(book): Promise<T> {
    return await this._repository.save(book);
  }

  async findBookByPk(id: number): Promise<T> {
    return await this._repository.findOne(id, {
      relations: ["bookImages", "owner", "author", "language", "publisher"],
    });
  }

  async getUserLibrary(id: number): Promise<T[]> {
    return await this._repository.find({
      where: { owner: id },
      relations: ["bookImages", "owner", "author", "language", "publisher"],
    });
  }

  async findBookByCategory(categories: string[]): Promise<any[]> {
    const books = await this._repository.query(`select category.name, book.*
      from ((category
      inner join book_categories on category.name = '${categories[0]}' AND book_categories.categoryId = category.id)
      inner join book on book_categories.bookId = book.id);`);

    let findedBooks = [];
    for (let i = 0; i < books.length; i++) {
      findedBooks.push(await this.findBookByPk(books[i].id));
    }
    return findedBooks;
  }

  async updateBook(id: number, book: T): Promise<UpdateResult> {
    return await this._repository.update(id, book);
  }
}
