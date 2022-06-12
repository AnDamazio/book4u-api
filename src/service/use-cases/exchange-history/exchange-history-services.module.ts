import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/service/data-services";
import { ExchangeHistoryServices } from "./exchange-history-services.service";

@Module({
  imports: [DataServicesModule],
  providers: [ExchangeHistoryServices],
  exports: [ExchangeHistoryServices],
})
export class ExchangeHistoryServicesModule {}
