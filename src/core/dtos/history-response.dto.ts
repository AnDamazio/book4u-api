import { IsString, IsNotEmpty } from "class-validator";

export class HistoryResponseDto {
  requester: any;
  offered: any;
  received: any;
  exchangeDate: any;
}
