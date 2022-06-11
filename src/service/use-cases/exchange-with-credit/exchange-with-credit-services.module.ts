import { Module } from "@nestjs/common";
import { DataServicesModule } from "../../data-services/data-services.module";
import { ExchangeWithCreditFactoryService } from "./exchange-with-credit-factory.service";
import { ExchangeWithCreditServices } from "./exchange-with-credit-services.service";

@Module({
    imports: [DataServicesModule],
    providers: [ExchangeWithCreditFactoryService, ExchangeWithCreditServices],
    exports: [ExchangeWithCreditFactoryService, ExchangeWithCreditServices],
})
export class ExchangeWithCreditServicesModule { }
