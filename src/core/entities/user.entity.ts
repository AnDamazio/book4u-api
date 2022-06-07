import { CreatePersonalDataDto, UserSituationDto } from '../dtos';
export class User {
  firstName: string;
  lastName: string;
  picture!: string;
  credits: string;
  registerNumber: string;
  personalData: CreatePersonalDataDto;
  userSituation: UserSituationDto;
}
