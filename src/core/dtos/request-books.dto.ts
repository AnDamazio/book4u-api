import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum, IsNotEmptyObject, IsObject, ValidateNested, IsEmpty } from 'class-validator';
import { CreateBookDto } from '.';
import { ExchangeSituation, ReadNotification } from '../enums';

export class RequestDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(ExchangeSituation)
    situation: ExchangeSituation

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateBookDto)
    book1: CreateBookDto;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateBookDto)
    book2: CreateBookDto;

    @IsString()
    createdAt: string;

    @IsEnum(ReadNotification)
    @IsEmpty()
    readOwner1: ReadNotification;

    @IsEnum(ReadNotification)
    @IsEmpty()
    readOwner2: ReadNotification;
}
