import { Injectable } from '@nestjs/common';
import { PersonalData } from '../../../core/entities';
import { CreatePersonalDataDto } from '../../../core/dtos';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PersonalDataFactoryService {
  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(8);

    return await bcrypt.hash(password, salt);
  }

  async createNewPersonalData(createPersonalDataDto: CreatePersonalDataDto) {
    const newPersonalData = new PersonalData();
    newPersonalData.email = createPersonalDataDto.email;
    newPersonalData.password = await this.encryptPassword(
      createPersonalDataDto.password,
    );
    newPersonalData.cpf = createPersonalDataDto.cpf;
    newPersonalData.rg = createPersonalDataDto.rg;
    newPersonalData.cellphone = createPersonalDataDto.cellphone;

    return newPersonalData;
  }
}
