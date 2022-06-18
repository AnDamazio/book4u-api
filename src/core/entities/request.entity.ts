import { CreateBookDto } from "../dtos";
import { ExchangeSituation, ReadNotification } from "../enums";

export class Request {
  book1: CreateBookDto;
  book2: CreateBookDto;
  situation: ExchangeSituation;
  createdAt: string;
  readOwner1: ReadNotification;
  readOwner2: ReadNotification;
}
