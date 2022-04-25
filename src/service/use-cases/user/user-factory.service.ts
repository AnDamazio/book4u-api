import { Injectable } from '@nestjs/common';
import { User } from '../../../core/entities';
import { CreateUserDto } from '../../../core/dtos';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.registerNumber = createUserDto.registerNumber;
    newUser.profileImage = createUserDto.profileImage;
    newUser.personalData = createUserDto.personalData;
    newUser.userSituation = createUserDto.userSituation;

    return newUser;
  }
}
