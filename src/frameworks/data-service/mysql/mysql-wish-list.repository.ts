import { IWishListRepository } from "src/core";
import { Repository } from "typeorm";

export class MysqlWishListRepository<T> implements IWishListRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async create(wish): Promise<T> {
    return await this._repository.save(wish);
  }

  remove(id): any {
    return this._repository.delete(id);
  }

  async findAll(id): Promise<T[]> {
    let obj = [];

    const wishes = (await this._repository.find({
      where: { user: id },
      relations: [
        "book",
        "book.bookImages",
        "book.author",
        "book.owner",
        "book.language",
        "book.publisher",
      ],
    })) as any;
    for (let i = 0; i < wishes.length; i++) {
      obj.push(wishes[i].book[i]);
    }
    return obj;
  }

  async findOne(wish, id) {
    const wishes = (await this._repository.find({
      where: { user: wish.user },
      relations: ["book", "user"],
    })) as any;

    for (let i = 0; i < wishes.length; i++) {
    console.log(wishes[i].book[0].id);
    console.log(wish.book[0].id )

      if (wishes[i].user.id == id && wish.book[0].id == wishes[i].book[0].id) {
        return wishes[i];
      }
    }
  }
}
