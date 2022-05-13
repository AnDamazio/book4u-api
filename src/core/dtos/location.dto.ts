import { IsString, IsNotEmpty } from 'class-validator';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  address: string;

  @IsString()
  complement: string;
}
