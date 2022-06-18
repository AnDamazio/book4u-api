import { Type } from "class-transformer";
import { IsEmpty, IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import { CreateBookDto, CreateUserDto } from "../dtos";
import { ExchangeSituation, ReadNotification } from "../enums";

export class ExchangeWithCreditDto {
    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateBookDto)
    book: CreateBookDto;

    @IsString()
    @IsNotEmpty()
    @IsEnum(ExchangeSituation)
    situation: ExchangeSituation

    @IsString()
    createdAt: string;

    @IsEnum(ReadNotification)
    @IsEmpty()
    readBuyer: ReadNotification;

    @IsEnum(ReadNotification)
    @IsEmpty()
    readOwner: ReadNotification;


}
