import { IUserSituationRepository, UserSituation } from 'src/core';
import { Repository } from 'typeorm';

export class MysqlUserSituationRepository<T> implements IUserSituationRepository<T> {
    private _repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this._repository = repository;
    }

    findAll(): Promise<T[]> {
        return this._repository.find();
    }

    create(userSituation): Promise<T> {
        return this._repository.save(userSituation);
    }

    async insertEnumValues(): Promise<UserSituation | any> {
        try {
            await this._repository.createQueryBuilder().insert().into('user_situation').values(
                [{ name: "CONFIRMADO" }]
            ).execute();
            return
        } catch (error) {
            return error
        }
    }

    async findOneByName(nameSituation: string): Promise<T> {
        return await this._repository.findOne({ where: { name: nameSituation } });
    }

    async checkIfExist(nameSituation: string): Promise<Boolean> {
        if ((await this.findOneByName(nameSituation)) === undefined) {
            return true
        } else {
            return false
        }
    }
}