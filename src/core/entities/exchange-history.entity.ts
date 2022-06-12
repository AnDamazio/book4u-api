import { ExchangeWithCredit } from ".";
import { User } from "./user.entity";
export class ExchangeHistory {
  exchangeDate: string;
  request?: Request[];
  exchangeWithCredit?: ExchangeWithCredit[];
}
