import { CreatePersonalDataDto } from '../dtos';
export class User {
  firstName: string;
  lastName: string;
  profileImage!: string;
  personalData: CreatePersonalDataDto;
}
