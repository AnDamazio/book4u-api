import { IsEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  Validate,
  IsMobilePhone,
} from "class-validator/cjs";
import { IsCpf } from "../validations/cpf-validation";
export class CreatePersonalDataDto {
  @IsString()
  @Validate(IsCpf)
  @IsNotEmpty()
  cpf: string;

  @IsMobilePhone()
  @IsNotEmpty()
  cellphone: string;

  @IsPhoneNumber("BR")
  @IsOptional()
  telephone: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(50)
  streetName: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(50)
  district: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(10)
  houseNumber: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(50)
  complement: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(8)
  zipCode: string;

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
