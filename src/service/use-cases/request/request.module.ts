import { Module } from "@nestjs/common";
import { DataServicesModule } from "../../data-services/data-services.module";
import { RequestFactoryService } from "./request-factory.service";
import { RequestServices } from "./request.service";

@Module({
  imports: [DataServicesModule],
  providers: [RequestFactoryService, RequestServices],
  exports: [RequestFactoryService, RequestServices],
})
export class RequestServicesModule {}
