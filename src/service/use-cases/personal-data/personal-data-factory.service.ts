import { Injectable } from "@nestjs/common";
import { PersonalData } from "../../../core/entities";
import { CreatePersonalDataDto } from "../../../core/dtos";
import * as bcrypt from "bcrypt";
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
    newPersonalData.cellphone = createPersonalDataDto.cellphone;
    newPersonalData.telephone = createPersonalDataDto.telephone;
    newPersonalData.streetName = createPersonalDataDto.streetName;
    newPersonalData.district = createPersonalDataDto.district;
    newPersonalData.houseNumber = createPersonalDataDto.houseNumber;
    newPersonalData.zipCode = createPersonalDataDto.zipCode;
    newPersonalData.complement = createPersonalDataDto.complement;
    newPersonalData.token = createPersonalDataDto.token;
    newPersonalData.city = createPersonalDataDto.city;
    newPersonalData.state = createPersonalDataDto.state;
    return newPersonalData;
  }
}
