import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAuthorDto } from './author.dto';
import { CreateLanguageDto } from './language.dto';
import { CreatePublisherDto } from './publisher.dto';
import { CreateCategoryDto } from './category.dto';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  pagesQuantity: number;

  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAuthorDto)
  author: CreateAuthorDto;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateLanguageDto)
  language: CreateLanguageDto;

  @Type(() => CreatePublisherDto)
  publisher: CreatePublisherDto;

  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto[];
}
