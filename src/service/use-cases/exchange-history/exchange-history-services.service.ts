import { Injectable } from "@nestjs/common";
import { ExchangeHistoryDto, ExchangeType } from "src/core";
import { IDataServices } from "../../../core/abstracts";

@Injectable()
export class ExchangeHistoryServices {
  constructor(private dataServices: IDataServices) {}

  async saveRegistry(exchangeHistory: ExchangeHistoryDto) {
    return await this.dataServices.exchangeHistory.create(exchangeHistory);
  }
}
