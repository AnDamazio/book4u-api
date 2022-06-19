import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsInt,
  Max,
  Min,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  IsOptional,
  isEmpty,
} from 'class-validator';
import { CreateBookDto } from './book.dto';
import { CreateUserDto } from './user.dto';

export class CreateWishListDto {

  @IsNotEmptyObject()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsNotEmptyObject()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBookDto)
  book: CreateBookDto[];
}
