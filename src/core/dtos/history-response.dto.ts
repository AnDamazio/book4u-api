import { IsString, IsNotEmpty } from "class-validator";

export class HistoryResponseDto {
  solicitante: any;
  ofertado: any;
  recebido: any;
  exchangeDate: any;
}
