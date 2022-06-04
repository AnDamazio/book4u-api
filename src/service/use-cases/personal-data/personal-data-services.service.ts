import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PersonalData } from "../../../core/entities";
import { IDataServices } from "../../../core/abstracts";
import {
  CreatePersonalDataDto,
  PartialPersonalDataDto,
} from "../../../core/dtos";
import { PersonalDataFactoryService } from "./personal-data-factory.service";
import { AuthService } from "src/frameworks/auth/auth.service";

@Injectable()
export class PersonalDataServices {
  constructor(
    private dataServices: IDataServices,
    private personalDataFactoryService: PersonalDataFactoryService
  ) {}

  async createPersonalData(
    createPersonalDataDto: CreatePersonalDataDto
  ): Promise<PersonalData> {
    const personalData = this.personalDataFactoryService.createNewPersonalData(
      createPersonalDataDto
    );
    return this.dataServices.personalData.create(await personalData);
  }

  async findByEmail(email: string): Promise<PersonalData> {
    try {
      const personal_data = await this.dataServices.personalData.findOneByEmail(
        email
      );
      return personal_data;
    } catch (err) {
      return err.message;
    }
  }

  async findPersonalDataById(id: number): Promise<PersonalData> {
    return await this.dataServices.personalData.findOneById(id);
  }

  async findUserDataByEmail(email: string): Promise<PersonalData> {
    return await this.dataServices.personalData.findUserDataByEmail(email);
  }

  async exchangePassword(
    id: number,
    newUserPassword: PersonalData
  ): Promise<any | Error> {
    return await this.dataServices.personalData.exchangePassword(
      id,
      newUserPassword
    );
  }

  async getIdFromPersonalData(
    personalData: PersonalData
  ): Promise<PersonalData> {
    return await this.dataServices.personalData.getIdFromPersonalData(
      personalData
    );
  }

  async insertToken(id: number, newUserToken: PersonalData): Promise<any> {
    try {
      return await this.dataServices.personalData.insertToken(id, newUserToken);
    } catch (err) {
      return err.message;
    }
  }

  async refreshToken(oldToken: string): Promise<PersonalData | HttpStatus> {
    const token = await this.dataServices.personalData.findToken(oldToken);
    if (token) {
      return await this.dataServices.personalData.findOneByEmail(token.email);
    } else {
      return HttpStatus.UNAUTHORIZED;
    }
  }

  async updatePersonalData(locationDto: PartialPersonalDataDto): Promise<any> {
    await this.dataServices.personalData.updateData(locationDto);
  }

  async rollBackPersonalData(personaData: PersonalData): Promise<any> {
    await this.dataServices.personalData.rollBack(personaData);
  }
}
