import { CreateBookDto, CreateUserDto } from "../dtos";
import { ExchangeSituation, ReadNotification } from "../enums";

export class ExchangeWithCredit {
    user: CreateUserDto;
    book: CreateBookDto;
    situation: ExchangeSituation;
    createdAt: string;
    readBuyer: ReadNotification;
    readOwner: ReadNotification;
}
