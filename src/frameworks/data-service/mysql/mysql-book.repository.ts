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
      relations: [
        "bookImages",
        "owner",
        "author",
        "language",
        "publisher",
        "category",
      ],
    });
  }

  async create(book): Promise<T> {
    return await this._repository.save(book);
  }

  async findBookByPk(id: number): Promise<T> {
    return await this._repository.findOne(id, { relations: ["bookImages"] });
  }

  async getUserLibrary(id: number): Promise<T[]> {
    return await this._repository.find({
      where: { owner: id },
      relations: [
        "bookImages",
        "owner",
        "author",
        "language",
        "publisher",
        "category",
      ],
    });
  }

  async findBookByCategory(categories: string[]): Promise<any[]> {
    const categoryId = 1;
    return await this._repository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.category", "category", "category.name = :name", {
        name: ["Filosofia"],
      })
      .getMany();
  }

  async updateBook(id: number, book: T): Promise<UpdateResult> {
    return await this._repository.update(id, book);
  }
}
