import { Controller } from '@nestjs/common';
import { PersonalDataServices } from 'src/service';

@Controller('api/personal-data')
export class PersonalDataController {
  constructor(private personalDataServices: PersonalDataServices) {}
}
