import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ExchangeSituation } from '../enums';

export class CreateExchangeSituationDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(ExchangeSituation)
    situation: string;
}
