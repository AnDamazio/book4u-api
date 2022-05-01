import { Repository, UpdateResult } from 'typeorm';
import { IUserRepository } from 'src/core';

export class MysqlUserRepository<T> implements IUserRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  findAll(): Promise<T[]> {
    return this._repository.find();
  }

  findOneById(id: number): Promise<T> {
    return this._repository.findOne({ relations: ['userSituation'], where: { id: id } })
  }

  create(user): Promise<T> {
    return this._repository.save(user)
  }

  async setProfilePic(id: number, fileName: any): Promise<any> {
    return await this._repository.update(id, fileName)
  }

  async getIdFromUser(user: T): Promise<T> {
    return await this._repository.getId(user);
  }

  async findOneByNRegister(registerNumber: string): Promise<T> {
    return await this._repository.findOne({ relations: ['userSituation', 'personalData'], where: { registerNumber: registerNumber } })
  }

  async updateSituationUser(id: number, newUser: T): Promise<UpdateResult> {
    return await this._repository.update(id, newUser)
  }

  async findOneByEmail(email: string): Promise<T> {
    try {
      const userData = await this._repository.findOne({ relations: ['personalData'], where: { personalData: { email: email } } })
      return userData;
    } catch (error) {
      console.log(error);
    }
  }

  async updateNRegister(id: number, newUser: T): Promise<UpdateResult> {
    return await this._repository.update(id, newUser)
  }


}