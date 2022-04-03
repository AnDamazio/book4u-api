import { CreatePersonalDataDto } from '../dtos';
export class User {
  firstName: string;
  lastName: string;
  personalData: CreatePersonalDataDto;
}
