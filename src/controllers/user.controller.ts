import { PersonalDataServices } from '../service/use-cases/personal-data/personal-data-services.service';
import { PersonalDataFactoryService } from '../service/use-cases/personal-data/personal-data-factory.service';
import { Controller, Post, Body, Request, UseGuards, Param, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from '../core/dtos';
import { UserServices } from 'src/service/use-cases/user/user-services.service';
import { UserFactoryService } from 'src/service/use-cases/user';
import { LocalAuthGuard } from 'src/frameworks/auth/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ref, uploadBytes, deleteObject } from 'firebase/storage'
import { storage } from '../firebase'

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

  @Put(':id')
  @UseInterceptors(FileInterceptor('profileImage'))
  async setProfilePic(@Param() id: number, @UploadedFile() file: Express.Multer.File) {
    const createUserResponse = new CreateUserResponseDto();
      const fileName = Date.now() + "_" + file.originalname
      const fileRef = ref(storage, fileName)
       uploadBytes(fileRef, file.buffer).then(
        async (snapshot) => {
         const createdProfilePic = await this.userServices.setProfilePic(id, fileName)
         return createUserResponse.createdUser = createdProfilePic;
        }
      ).catch(error => console.log(error)) 
  }
}
