import { Injectable } from '@nestjs/common';
import { PersonalData } from '../../../core/entities';
import { CreatePersonalDataDto } from '../../../core/dtos';
import { validate } from 'class-validator';

@Injectable()
export class PersonalDataFactoryService {
  createNewPersonalData(createPersonalDataDto: CreatePersonalDataDto) {
    const newPersonalData = new PersonalData();
    newPersonalData.email = createPersonalDataDto.email;
    newPersonalData.password = createPersonalDataDto.password;
    newPersonalData.cpf = createPersonalDataDto.cpf;
    newPersonalData.rg = createPersonalDataDto.rg;
    newPersonalData.cellphone = createPersonalDataDto.cellphone;

    return newPersonalData;
  }
}
