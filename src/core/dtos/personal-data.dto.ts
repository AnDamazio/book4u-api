import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  Length,
  Validate,
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

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  cellphone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8)
  @IsNotEmpty()
  password: string;
}
