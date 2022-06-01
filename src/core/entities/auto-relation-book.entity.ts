import { CreateBookDto } from "../dtos";
import { ExchangeSituation } from "../enums";

export class AutoRelationBook {
    book1: CreateBookDto;
    book2: CreateBookDto;
    situation: ExchangeSituation;
    createdAt: string;
}