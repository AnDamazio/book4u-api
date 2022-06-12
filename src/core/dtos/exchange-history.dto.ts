import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsOptional,
} from "class-validator";
import { ExchangeWithCreditDto } from ".";
import { RequestDto } from "./request-books.dto";

export class ExchangeHistoryDto {
  @IsString()
  @IsNotEmpty()
  exchangeDate: string;

  @IsArray()
  @IsOptional()
  request?: RequestDto[];

  @IsArray()
  @IsOptional()
  exchangeWithCredit?: ExchangeWithCreditDto[];
}
