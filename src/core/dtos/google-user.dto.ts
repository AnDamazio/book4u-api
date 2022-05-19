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
  export class CreateGoogleUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string;
  
    @IsString()
    picture: string;
  
    @IsString()
    registerNumber: string = '1234';
  
    @IsObject()
    @ValidateNested()
    @Type(() => CreatePersonalDataDto)
    personalData: CreatePersonalDataDto;
  
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => UserSituationDto)
    userSituation: UserSituationDto = {name: 'PENDENTE'}
  }
  