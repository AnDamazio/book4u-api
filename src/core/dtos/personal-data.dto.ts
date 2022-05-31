import { IsEmpty, MaxLength, MinLength } from 'class-validator';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  Validate,
  IsMobilePhone,
} from 'class-validator/cjs';
import { IsNull } from 'typeorm';
import { IsCpf } from '../validations/cpf-validation';
export class CreatePersonalDataDto {
  @IsString()
  @Validate(IsCpf)
  @IsNotEmpty()
  cpf: string;

  @IsMobilePhone()
  @IsNotEmpty()
  cellphone: string;

  @IsPhoneNumber('BR')
  telephone: string;

  @IsString()
  @MinLength(0)
  @MaxLength(50)
  address: string;

  @IsString()
  @MinLength(0)
  @MaxLength(50)
  complement: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmpty()
  token: string;
}
