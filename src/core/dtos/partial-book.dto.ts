import { Transform, Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateIf,
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsArray,
  IsNumber,
} from "class-validator";
import { Condition } from "../enums";


export class PartialBookDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => null)
  name: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => null)
  pagesQuantity: number;

  @IsOptional()
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => null)
  synopsis: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.price === "")
  @Transform((value) => null)
  price: string;

  @IsOptional()
  @IsEnum(Condition)
  @IsString()
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => null)
  condition: string;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => null)
  author: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => null)
  language: string;

  @IsOptional()
  @IsString()
  @MinLength(13)
  @MaxLength(13)
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => null)
  publisher: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @ValidateIf((o) => o.zipCode === "")
  @Transform((value) => [])
  category?: string[];
}
