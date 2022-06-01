import { Transform } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsMobilePhone,
  ValidateIf,
} from "class-validator";

export class PartialPersonalDataDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id: string;

  @IsMobilePhone()
  @IsOptional()
  @ValidateIf((o) => o.zipCode === "")
  @Transform(value  => null)
  cellphone: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(50)
  @ValidateIf((o) => o.zipCode === "")
  @Transform(value  => null)
  streetName: string ;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(50)
  @ValidateIf((o) => o.zipCode === "")
  @Transform(value  => null)
  complement: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(10)
  @ValidateIf((o) => o.zipCode === "")
  @Transform(value  => null)
  houseNumber: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(50)
  @ValidateIf((o) => o.zipCode === "")
  @Transform(value  => null)
  district: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(8)
  @ValidateIf((o) => o.zipCode === "")
  @Transform(value  => null)
  zipCode: string;

  @IsString()
  @IsOptional()
  @MinLength(13)
  @MaxLength(13)
  @ValidateIf((o) => o.zipCode === "")
  @Transform(value  => null)
  telephone: string;
}
