import { IsString, IsNotEmpty } from "class-validator";

export class HistoryResponseDto {
  id: number;
  requester: any;
  offered: any;
  received: any;
  exchangeDate: any;
  situation: any;
}
