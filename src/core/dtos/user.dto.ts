import { PersonalData } from '../entities/personal-data.entity';
import { IsString, IsInstance, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsInstance(PersonalData)
  @IsNotEmpty()
  personalData: PersonalData;
}
