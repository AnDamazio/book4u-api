import { Injectable } from '@nestjs/common';
import { PersonalData } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreatePersonalDataDto } from '../../../core/dtos';
import { PersonalDataFactoryService } from './personal-data-factory.service';

@Injectable()
export class PersonalDataServices {
  constructor(
    private dataServices: IDataServices,
    private personalDataFactoryService: PersonalDataFactoryService,
  ) {}

  async createPersonalData(
    createPersonalDataDto: CreatePersonalDataDto,
  ): Promise<PersonalData> {
    const personalData = this.personalDataFactoryService.createNewPersonalData(
      createPersonalDataDto,
    );
    return this.dataServices.personalData.create(await personalData);
  }

  findByEmail(email: string): Promise<PersonalData> {
    const personal_data = this.dataServices.personalData.findOneByEmail(email);
    return personal_data;
  }

  async findPersonalDataById(id: number): Promise<PersonalData> {
    return await this.dataServices.personalData.findOneById(id);
  }

  async findUserDataByEmail(email: string): Promise<PersonalData> {
    return await this.dataServices.personalData.findUserDataByEmail(email);
  }

  async exchangePassword(
    id: number,
    newUserPassword: PersonalData,
  ): Promise<any | Error> {
    return await this.dataServices.personalData.exchangePassword(
      id,
      newUserPassword,
    );
  }

  async getIdFromPersonalData(
    personalData: PersonalData,
  ): Promise<PersonalData> {
    return await this.dataServices.personalData.getIdFromPersonalData(
      personalData,
    );
  }
}
