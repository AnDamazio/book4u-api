import { Injectable } from '@nestjs/common';
import { PersonalData } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreatePersonalDataDto } from '../../../core/dtos';
import { PersonalDataFactoryService} from './personal-data-factory.service';

@Injectable()
export class PersonalDataServices {
  constructor(
    private dataServices: IDataServices,
    private personalDataFactoryService: PersonalDataFactoryService,
  ) {}

  createPersonalData(createPersonalDataDto: CreatePersonalDataDto): Promise<PersonalData> {
    const personalData = this.personalDataFactoryService.createNewPersonalData(createPersonalDataDto);
    return this.dataServices.personalData.create(personalData);
  }
}
