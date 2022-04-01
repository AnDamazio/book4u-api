import { Injectable } from '@nestjs/common';
import { User } from '../../../core/entities';
import { CreateUserDto } from '../../../core/dtos';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.personalData = createUserDto.personalData;

    return newUser;
  }
}
