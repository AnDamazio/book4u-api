import { CreateBookDto, CreateUserDto } from "../dtos";
import { ExchangeSituation } from "../enums";

export class ExchangeWithCredit {
    user: CreateUserDto;
    book: CreateBookDto;
    situation: ExchangeSituation;
    createdAt: string;
}
