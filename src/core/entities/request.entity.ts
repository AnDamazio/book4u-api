import { ExchangeHistory } from "./exchange-history.entity";
import { User } from "./user.entity";

export class Request {
  situation: string;
  offeredBook: string;
  availableBook: string;
  user: User[];
  exchangeHistory: ExchangeHistory;
}
