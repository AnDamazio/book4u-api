import { Injectable } from "@nestjs/common";
import { ExchangeHistoryDto, ExchangeType } from "src/core";
import { IDataServices } from "../../../core/abstracts";

@Injectable()
export class ExchangeHistoryServices {
  constructor(private dataServices: IDataServices) {}

  async saveRegistry(exchangeHistory: ExchangeHistoryDto) {
    return await this.dataServices.exchangeHistory.create(exchangeHistory);
  }

  async findHistory(userId: number) {
    return await this.dataServices.exchangeHistory.findOne(userId);
  }

  async findHistoryCredits(userId: number) {
    return await this.dataServices.exchangeHistory.findOneCreditExchanges(
      userId
    );
  }
}
