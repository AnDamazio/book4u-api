import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsEmpty
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePersonalDataDto } from './personal-data.dto';
import { UserSituationDto } from './user-situation.dto';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  picture: string;

  @IsString()
  @IsEmpty()
  credits: string;

  @IsString()
  registerNumber: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonalDataDto)
  personalData: CreatePersonalDataDto;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => UserSituationDto)
  userSituation: UserSituationDto;
}
