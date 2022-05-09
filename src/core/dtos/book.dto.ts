import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAuthorDto } from './author.dto';
import { CreateLanguageDto } from './language.dto';
import { CreatePublisherDto } from './publisher.dto';
import { CreateCategoryDto } from './category.dto';
import { Book } from '../entities';
import { CreateBookImagesDto } from './book-images.dto';

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

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePublisherDto)
  publisher: CreatePublisherDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => CreateBookImagesDto)
  bookImages: CreateBookImagesDto;
}
