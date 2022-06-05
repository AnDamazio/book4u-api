import { Not, Repository, UpdateResult } from "typeorm";
import { IBookRepository } from "src/core";
import { CreateBookCategoriesDto } from "src/core/dtos/book-categories.dto";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class MysqlBookRepository<T> implements IBookRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async findAll(id: number): Promise<T[]> {
    return await this._repository.find({
      where: { owner: Not(id) },
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

  async updateBook(id: number, book): Promise<UpdateResult> {
    return await this._repository.update(id, book);
  }

  async getIdFromBook(book: T): Promise<number> {
    return await this._repository.getId(book);
  }

  async findBooksByDate(dayInterval: number): Promise<T[]> {
    const date = new Date();
    const actualDate = new Date().toLocaleDateString();
    const actualDay = actualDate.slice(0, 2);
    const actualMonth = actualDate.slice(3, 5);
    const actualYear = actualDate.slice(6, 10);
    date.setHours(date.getHours() - dayInterval * 24);
    const treatedDate = date.toLocaleDateString();
    const day = treatedDate.slice(0, 2);
    const month = treatedDate.slice(4, 5);
    const year = treatedDate.slice(6, 10);

    const books = await this._repository.query(
      `SELECT * FROM book WHERE DATE(createdAt) > '${year}-${month}-${day}' AND DATE(createdAt) < '${actualYear}-${actualMonth}-${actualDay}';`
    );

    let findedBooks = [];
    for (let i = 0; i < books.length; i++) {
      findedBooks.push(await this.findBookByPk(books[i].id));
    }
    return findedBooks;
  }
}
