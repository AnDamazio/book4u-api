import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { CreateBookDto } from '.';
import { ExchangeSituation } from '../enums';

export class CreateExchangeBooksDto {
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
}
