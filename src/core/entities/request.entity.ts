<<<<<<< HEAD
import { CreateBookDto } from "../dtos";
import { ExchangeSituation } from "../enums";

export class Request {
    book1: CreateBookDto;
    book2: CreateBookDto;
    situation: ExchangeSituation;
    createdAt: string;
}
=======
import { ExchangeHistory } from "./exchange-history.entity";
import { User } from "./user.entity";

export class Request {
  situation: string;
  offeredBook: string;
  availableBook: string;
  user: User[];
  exchangeHistory: ExchangeHistory;
}
>>>>>>> 0587f5a94a366ffcb70a7556f72868f380c5b4be
