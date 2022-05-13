import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAuthorDto } from './author.dto';
import { CreateLanguageDto } from './language.dto';
import { CreatePublisherDto } from './publisher.dto';
import { CreateCategoryDto } from './category.dto';
<<<<<<< HEAD
import { CreateBookImagesDto } from './book-images.dto';
import { CreateUserDto } from './user.dto';
import { Condition, Status } from '../enums';
=======
import { Book } from '../entities';
import { CreateBookImagesDto } from './book-images.dto';
>>>>>>> 24573e1cf095eb61263be8a4e56783439992f08b

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
  price: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: string;

  @IsEnum(Condition)
  @IsNotEmpty()
  condition: string;

  @IsString()
  createdAt: string;

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
<<<<<<< HEAD

  @ValidateNested()
  @Type(() => CreateUserDto)
  owner: CreateUserDto;
=======
>>>>>>> 24573e1cf095eb61263be8a4e56783439992f08b
}
