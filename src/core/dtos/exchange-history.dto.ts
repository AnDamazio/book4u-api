import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsOptional,
} from "class-validator";
import { ExchangeWithCreditDto } from ".";
import { User } from "../entities";
import { ExchangeType } from "../enums";
import { RequestDto } from "./request-books.dto";

export class ExchangeHistoryDto {
  @IsString()
  @IsNotEmpty()
  exchangeDate: string;

  @IsEnum(ExchangeType)
  @IsNotEmpty()
  exchangeType: ExchangeType;

  @IsArray()
  @IsOptional()
  request?: RequestDto[];

  @IsArray()
  @IsOptional()
  exchangeWithCredit?: ExchangeWithCreditDto[];

  @IsArray()
  user: User[];
}
