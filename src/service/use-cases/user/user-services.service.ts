import { Injectable } from '@nestjs/common';
import { User } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateGoogleUserDto, CreateUserDto } from '../../../core/dtos';
import { UserFactoryService } from './user-factory.service';
@Injectable()
export class UserServices {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
  ) { }

  getAllUsers(): Promise<User[]> {
    return this.dataServices.user.findAll();
  }

  getUserById(id: any): Promise<User> {
    return this.dataServices.user.findOneById(id);
  }

  createUser(createUserDto: CreateUserDto | CreateGoogleUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createUserDto);
    return this.dataServices.user.create(user);
  }

  async setProfilePic(id: any, fileName: string): Promise<User> {
    const findedUser = await this.dataServices.user.findOneById(id);
    if (findedUser) {
      findedUser.picture = fileName;
      return this.dataServices.user.setProfilePic(id, findedUser);
    } else {
      return;
    }
  }

  async getUserByNRegister(registerNumber: string): Promise<User> {
    const findedUser = await this.dataServices.user.findOneByNRegister(
      registerNumber,
    );
    if (findedUser) {
      return findedUser;
    } else {
      return;
    }
  }

  async setSituationUser(
    id: number,
    enumSituation: 'PENDENTE' | 'CONFIRMADO',
  ): Promise<any | Error> {
    const findedUser = await this.dataServices.user.findOneById(id);
    if (findedUser) {
      const userSituation = await this.dataServices.userSituation.findOneByName(
        enumSituation,
      );
      findedUser.userSituation = userSituation;
      return this.dataServices.user.updateSituationUser(id, findedUser);
    } else {
      return Error('Erro ao atualizar situação de usuário');
    }
  }

  async getIdFromUser(user: User): Promise<Number | String> {
    return await this.dataServices.user.getIdFromUser(user);
  }

  async findByEmail(email: string): Promise<User> {
    const personal_data = this.dataServices.user.findOneByEmail(email);
    return personal_data;
  }

  async updateUser(id: number, newUser: User): Promise<any> {
    return await this.dataServices.user.updateUser(id, newUser);
  }

}
