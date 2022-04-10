import { IsString, Length } from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  @Length(2, 100)
  name: string;
}
