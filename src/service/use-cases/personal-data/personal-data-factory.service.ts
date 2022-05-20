import { Injectable } from '@nestjs/common';
import { PersonalData } from '../../../core/entities';
import { CreatePersonalDataDto } from '../../../core/dtos';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PersonalDataFactoryService {
  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, Number(salt));
  }

  async createNewPersonalData(createPersonalDataDto: CreatePersonalDataDto) {
    const newPersonalData = new PersonalData();
    newPersonalData.email = createPersonalDataDto.email;
    newPersonalData.password = createPersonalDataDto.password;
    newPersonalData.cpf = createPersonalDataDto.cpf;
    newPersonalData.rg = createPersonalDataDto.rg;
    newPersonalData.cellphone = createPersonalDataDto.cellphone;
    newPersonalData.telephone = createPersonalDataDto.telephone;
    newPersonalData.address = createPersonalDataDto.address;
    newPersonalData.complement = createPersonalDataDto.complement;
    newPersonalData.token = createPersonalDataDto.token;

    return newPersonalData;
  }
}
