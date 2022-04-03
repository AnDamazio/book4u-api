import { PersonalDataServices } from '../service/use-cases/personal-data/personal-data-services.service';
import { PersonalDataFactoryService } from '../service/use-cases/personal-data/personal-data-factory.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from '../core/dtos';
import { UserServices } from 'src/service/use-cases/user/user-services.service';
import { UserFactoryService } from 'src/service/use-cases/user';
import { validate } from 'class-validator';

@Controller('api/user')
export class UserController {
  constructor(
    private userServices: UserServices,
    private userFactoryService: UserFactoryService,
    private personalDataServices: PersonalDataServices,
    private personalDataFactoryService: PersonalDataFactoryService,
  ) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    const createUserResponse = new CreateUserResponseDto();
    try {
      const personalData =
        this.personalDataFactoryService.createNewPersonalData(
          userDto.personalData,
        );
      const createdPersonalData =
        await this.personalDataServices.createPersonalData(personalData);
      userDto.personalData = createdPersonalData;
      const user = this.userFactoryService.createNewUser(userDto);
      const createdUser = await this.userServices.createUser(user);

      createUserResponse.success = true;
      createUserResponse.createdUser = createdUser;
    } catch (error) {
      // report and log error
      console.log(error);

      createUserResponse.success = false;
    }

    return createUserResponse;
  }

  @Get('listar')
  async userList() {
    const users = await this.userServices.getAllUsers();
    console.log(users);
    return users;
  }
}
