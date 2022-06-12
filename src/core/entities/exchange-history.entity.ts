import { ExchangeWithCredit } from ".";
import { ExchangeType } from "../enums";
import { Request } from "./request.entity";
import { User } from "./user.entity";
export class ExchangeHistory {
  exchangeDate: string;
  request?: Request[];
  exchangeWithCredit?: ExchangeWithCredit[];
  user: User[];
  exchangeType: ExchangeType;
}
