import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { EnumCategory } from '../enums';


export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(EnumCategory)
  name: string;
}
