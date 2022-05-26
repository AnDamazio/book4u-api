import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class TelephoneDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  telephone: string;
}
