import { Module } from "@nestjs/common";
import { UserFactoryService } from "./user-factory.service";
import { DataServicesModule } from "src/service/data-services";
import { UserServices } from "./user-services.service";

@Module({
  imports: [DataServicesModule],
  providers: [UserFactoryService, UserServices],
  exports: [UserFactoryService, UserServices],
})
export class UserServicesModule {}
