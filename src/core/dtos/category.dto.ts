import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';
import { CreateBookCategoriesDto } from './book-categories.dto';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  bookCategories?: CreateBookCategoriesDto[];
}
