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
    return this.dataServices.user.getAll();
  }

  getUserById(id: any): Promise<User> {
    return this.dataServices.user.getOne(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createUserDto);
    return this.dataServices.user.create(user);
  }
}
