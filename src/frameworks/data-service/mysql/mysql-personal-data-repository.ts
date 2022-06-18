import { Repository, UpdateResult } from "typeorm";
import { IPersonalDataRepository } from "src/core";
import { use } from "passport";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class MysqlPersonalDataRepository<T>
  implements IPersonalDataRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  create(personalData): Promise<T> {
    return this._repository.save(personalData);
  }

  async findOneByEmail(email: string): Promise<T> {
    try {
      const userData = await this._repository
        .createQueryBuilder("personal_data")
        .where("personal_data.email = :email", { email: email })
        .getOne();
      return userData;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserDataByEmail(email: string) {
    try {
      const userData = await this._repository
        .createQueryBuilder("personal_data")
        .leftJoinAndSelect("personal_data.user", "user")
        .leftJoinAndSelect("user.userSituation", "user_situation")
        .where("personal_data.email = :email", { email: email })
        .getOne();
      return userData;
    } catch (error) {
      console.log(error);
    }
  }

  async findOneById(id: number): Promise<T> {
    return await this._repository.findOne({ where: { id: id } });
  }

  async exchangePassword(id: number, newUserPassword): Promise<UpdateResult> {
    return await this._repository.update(id, newUserPassword);
  }

  async getIdFromPersonalData(personalData: T): Promise<T> {
    return await this._repository.getId(personalData);
  }

  async insertToken(id: number, newUserToken): Promise<UpdateResult> {
    return await this._repository.update(id, newUserToken);
  }

  async findToken(token: string): Promise<T> {
    try {
      const user = await this._repository.findOne(token);
      return user;
    } catch (err) {
      return err.message;
    }
  }

  async updateData(personalData) {
    return await this._repository.update(
      personalData.id,
      personalData as unknown as QueryDeepPartialEntity<T>
    );
  }

  async rollBack(personalData) {
    return await this._repository.delete(personalData);
  }
}
