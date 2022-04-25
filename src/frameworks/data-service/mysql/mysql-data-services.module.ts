import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataServices } from 'src/core';
import {
  User,
  PersonalData,
  Author,
  Book,
  Language,
  Publisher,
  Category,
  UserSituation,
} from './model';
import { MysqlDataServices } from './mysql-data-services.service';
import 'dotenv/config';

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
      UserSituation
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'book4uapi',
      entities: [__dirname + '/../**/*.model{.ts,.js}'],
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
export class MysqlDataServicesModule { }
