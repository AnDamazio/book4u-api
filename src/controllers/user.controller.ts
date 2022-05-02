import { PersonalDataServices } from '../service/use-cases/personal-data/personal-data-services.service';
import { PersonalDataFactoryService } from '../service/use-cases/personal-data/personal-data-factory.service';
import { UserSituationFactoryService } from 'src/service/use-cases/userSituation';
import { UserSituationServices } from 'src/service/use-cases/userSituation';
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import {
  CreatePersonalDataDto,
  CreateUserDto,
  CreateUserResponseDto,
  UserSituationDto,
} from '../core/dtos';
import { UserServices } from 'src/service/use-cases/user/user-services.service';
import { UserFactoryService } from 'src/service/use-cases/user';
import { LocalAuthGuard } from 'src/frameworks/auth/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import * as nodemailer from 'nodemailer';
import { SMTP_CONFIG } from '../smtp/smtp-config';

const transport = nodemailer.createTransport({
  service: SMTP_CONFIG.service,
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass
  },
  tls: {
    rejectUnauthorized: false
  }
})

@Controller('api/user')
export class UserController {
  constructor(
    private userServices: UserServices,
    private userFactoryService: UserFactoryService,
    private personalDataServices: PersonalDataServices,
    private personalDataFactoryService: PersonalDataFactoryService,
    private userSituationServices: UserSituationServices,
    private userSituationFactoryService: UserSituationFactoryService,
  ) { }

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {

    const createUserResponse = new CreateUserResponseDto();
    {
      try {
        const personalData =
          this.personalDataFactoryService.createNewPersonalData(
            userDto.personalData,
          );
        const createdPersonalData =
          await this.personalDataServices.createPersonalData(
            await personalData,
          );
        userDto.personalData = createdPersonalData;
        const userSituation =
          this.userSituationFactoryService.createnewUserSituation(
            userDto.userSituation,
          );
        const createdUserSituation =
          await this.userSituationServices.createUserSituation(userSituation);
        userDto.userSituation = createdUserSituation;

        const user = this.userFactoryService.createNewUser(userDto);
        function generateNewNumber() {
          const nGenerated = String(Math.floor(Math.random() * 3000) + 1);
          if (nGenerated.length == 4) {
            user.registerNumber = nGenerated;
          } else {
            generateNewNumber();
          }
        }
        generateNewNumber();

        const createdUser = await this.userServices.createUser(user);
        createUserResponse.createdUser = createdUser;

        transport.sendMail({
          text: `Obrigado por se cadastrar no Book4U, SEJA BEM VINDO! Aqui está seu código de verificação ${user.registerNumber}`,
          subject: `Confirmação de cadastro`,
          from: SMTP_CONFIG.user,
          to: createdPersonalData.email,
        }).then(
          (param) => console.log(param)
        ).catch(error => console.log(error))

        return createUserResponse;
      } catch (err) {
        createUserResponse.success = false;
        return err.message

      }
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profileImage'))
  async setProfilePic(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userFound = this.userServices.getUserById(id);
    const createUserResponse = new CreateUserResponseDto();
    if ((await userFound).profileImage != '') {
      const userPic = (await userFound).profileImage;
      const fileRef = ref(storage, userPic);
      deleteObject(fileRef)
        .then()
        .catch((error) => console.log(error));
    }
    const fileName = Date.now() + '_' + file.originalname;
    const fileRef = ref(storage, fileName);
    uploadBytes(fileRef, file.buffer)
      .then(async () => {
        const createdProfilePic = await this.userServices.setProfilePic(
          id,
          fileName,
        );
        createUserResponse.createdUser = createdProfilePic
        return "Imagem trocada com sucesso!"
      })
      .catch((error) => { return (error) });
  }

  @Put('confirmRegistration/:rNumber')
  async confirmRegistration(@Param('rNumber') rNumber: string) {
    await this.userSituationServices.insertEnumValue();
    const userFound = await this.userServices.getUserByNRegister(rNumber);
    const getIdFromUser = await this.userServices.getIdFromUser(userFound);
    const createUserResponse = new CreateUserResponseDto();
    if (userFound.registerNumber == rNumber) {
      const newUserSituation = await this.userServices.setSituationUser(
        Number(getIdFromUser),
        (userFound.userSituation.name = 'CONFIRMADO'),
      );
      return userFound.registerNumber;
    } else {
      return ("Código de registro incorreto, tente novamente")
    }
  }

  @Put('resendRNumber/:email')
  async resendRNumber(@Param('email') email: string) {
    const userFound = await this.userServices.findByEmail(email);
    const getIdFromUser = await this.userServices.getIdFromUser(userFound);
    if (userFound) {
      function generateNewNumber() {
        const nGenerated = String(Math.floor(Math.random() * 3000) + 1)
        if (nGenerated.length == 4) {
          userFound.registerNumber = nGenerated
        } else {
          generateNewNumber()
        }
      }
      generateNewNumber()
      transport.sendMail({
        text: `Seu novo código de registro é: ${userFound.registerNumber}`,
        subject: `Novo número de registro`,
        from: SMTP_CONFIG.user,
        to: userFound.personalData.email,
      }).then(
        await this.userServices.updateNRegister(Number(getIdFromUser), userFound)
      ).catch((error) => { return error })
      return (`E-mail enviado para o email ${userFound.personalData.email}`)
    } else {
      return "Usuário não encontrado"
    }
  }

  @Put('exchangePassword/:email')
  async exchangePassword(@Param('email') email: string, @Body('password') password: CreatePersonalDataDto["password"]) {
    const userFound = await this.personalDataServices.findByEmail(email)
    const getIdFromPersonalData = await this.personalDataServices.getIdFromPersonalData(userFound)
    if (userFound) {
      userFound.password = await this.personalDataFactoryService.encryptPassword(String(password))
      await this.personalDataServices.exchangePassword(Number(getIdFromPersonalData), userFound)
      return "Senha alterada com sucesso"
    } else {
      return "Erro ao alterar dado de situação de usuário para confirmado"
    }
  }
}
