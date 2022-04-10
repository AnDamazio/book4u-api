import { PersonalDataServices } from '../service/use-cases/personal-data/personal-data-services.service';
import { PersonalDataFactoryService } from '../service/use-cases/personal-data/personal-data-factory.service';
import { Controller, Post, Body,Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from '../core/dtos';
import { UserServices } from 'src/service/use-cases/user/user-services.service';
import { UserFactoryService } from 'src/service/use-cases/user';
import { LocalAuthGuard } from 'src/frameworks/auth/local-auth.guard';

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
        await this.personalDataServices.createPersonalData(await personalData);
      userDto.personalData = createdPersonalData;
      const user = this.userFactoryService.createNewUser(userDto);
      const createdUser = await this.userServices.createUser(user);

      createUserResponse.success = true;
      createUserResponse.createdUser = createdUser;
    } catch (error) {
      console.log(error);
      createUserResponse.success = false;
    }

    return createUserResponse;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
