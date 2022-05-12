import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePersonalDataDto } from './personal-data.dto';
import { UserSituationDto } from './user-situation.dto';
import { UserSituation } from '../entities';
import { EnumUserSituation } from '../enums';
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
