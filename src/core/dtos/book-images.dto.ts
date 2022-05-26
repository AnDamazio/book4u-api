import { IsString } from 'class-validator';

export class CreateBookImagesDto {
    @IsString()
    frontSideImage: string;

    @IsString()
    rightSideImage: string;

    @IsString()
    leftSideImage: string;

    @IsString()
    backSideImage: string;
}
