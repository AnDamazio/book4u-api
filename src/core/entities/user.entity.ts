import { CreatePersonalDataDto, UserSituationDto } from '../dtos';
export class User {
  firstName: string;
  lastName: string;
  profileImage!: string;
  registerNumber: string;
  personalData: CreatePersonalDataDto;
  userSituation: UserSituationDto
}
