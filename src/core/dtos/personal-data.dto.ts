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

  @IsString()
  @IsNotEmpty()
  rg: string;

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

<<<<<<< HEAD
=======
  @IsString()
  @IsEmpty()
  token: string;
>>>>>>> 80de06eb63220560a803ec6cc1f9da6eaece0dbf
}
