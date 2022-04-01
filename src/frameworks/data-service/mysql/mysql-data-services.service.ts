import { MysqlPersonalDataRepository } from './mysql-personal-data-repository';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User, PersonalData } from "./model";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { IDataServices } from "src/core";
import { MysqlUserRepository } from "./mysql-user-repository";

@Injectable()
export class MysqlDataServices
  implements IDataServices, OnApplicationBootstrap
{
  user: MysqlUserRepository<User>;
  personalData: MysqlPersonalDataRepository<PersonalData>;
  
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    @InjectRepository(PersonalData) private PersonalDataRepository: Repository<PersonalData>
  ) {}

  onApplicationBootstrap() {
    this.user = new MysqlUserRepository<User>(this.UserRepository);
    this.personalData = new MysqlPersonalDataRepository<PersonalData>(this.PersonalDataRepository);
  }
}
