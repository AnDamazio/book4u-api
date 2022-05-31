import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateBookDto } from './book.dto';
import { CreateCategoryDto } from './category.dto';

export class CreateBookCategoriesDto {
  @IsNotEmpty()
  @IsOptional()
  book?: CreateBookDto;

  @IsNotEmpty()
  category: CreateCategoryDto;
}
