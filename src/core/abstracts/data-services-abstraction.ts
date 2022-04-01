import { IPersonalDataRepository } from 'src/core';
import { User, PersonalData } from '../entities';
import { IUserRepository } from './user-repository-abstract';

export abstract class IDataServices {
  abstract user: IUserRepository<User>;
  abstract personalData: IPersonalDataRepository<PersonalData>;
}
