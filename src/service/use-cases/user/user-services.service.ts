import { Injectable } from '@nestjs/common';
import { User } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateUserDto } from '../../../core/dtos';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserServices {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.dataServices.user.findAll();
  }

  getUserById(id: any): Promise<User> {
    return this.dataServices.user.findOneById(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createUserDto);
    return this.dataServices.user.create(user);
  }

  async setProfilePic(id: any, fileName: string): Promise<User> {
    const findedUser = await this.dataServices.user.findOneById(id);
    if (findedUser) {
      findedUser.profileImage = fileName;
      return this.dataServices.user.setProfilePic(id, findedUser);
    } else {
      return 
    }
  } 
  }