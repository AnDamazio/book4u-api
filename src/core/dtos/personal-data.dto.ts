import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  Length,
  Validate,
  IsMobilePhone
} from 'class-validator/cjs';
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
  @IsNotEmpty()
  telephone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8)
  @IsNotEmpty()
  password: string;
}
