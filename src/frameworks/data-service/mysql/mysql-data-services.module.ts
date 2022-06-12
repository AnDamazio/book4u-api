import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IDataServices } from "src/core";
import {
  User,
  PersonalData,
  Author,
  Book,
  Language,
  Publisher,
  Category,
  UserSituation,
  BookImages,
  Wish,
  Request,
  BookCategories,
  ExchangeWithCredit,
  ExchangeHistory,
} from "./model";
import { MysqlDataServices } from "./mysql-data-services.service";
import "dotenv/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      PersonalData,
      Author,
      Book,
      Publisher,
      Category,
      Language,
      Category,
      UserSituation,
      BookImages,
      Wish,
      Request,
      BookCategories,
      ExchangeWithCredit,
      ExchangeHistory,
    ]),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + "/../**/*.model{.ts,.js}"],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MysqlDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MysqlDataServicesModule {}
