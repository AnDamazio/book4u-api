import { IsNotEmpty, IsString } from "class-validator";

export class PictureDto {
    @IsString()
    @IsNotEmpty()
    picture: string;
}