import { CreateBookDto } from "../dtos";
import { ExchangeSituation } from "../enums";

export class Request {
    book1: CreateBookDto;
    book2: CreateBookDto;
    situation: ExchangeSituation;
    createdAt: string;
}