import { Repository, UpdateResult } from "typeorm";
import { IRequestRepository } from "src/core/abstracts/request-repository.abstract";

export class MysqlRequestRepository<T> implements IRequestRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  create(request): Promise<T> {
    return this._repository.save(request);
  }

  findAllRequest(id): Promise<T[]> {
    return this._repository
      .createQueryBuilder("request")
      .where({ id: id })
      .getMany();
  }

  deleteRequest(id): Promise<any> {
    return this._repository.delete(id);
  }
}
