import { Module } from "@nestjs/common";
import { MysqlDataServicesModule } from "src/frameworks/data-service/mysql";
@Module({
  imports: [MysqlDataServicesModule],
  exports: [MysqlDataServicesModule],
})
export class DataServicesModule {}
