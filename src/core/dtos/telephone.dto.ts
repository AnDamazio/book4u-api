import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class TelephoneDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  telephone: string;
}
