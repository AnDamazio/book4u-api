import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Book } from "./book.model";
import { ExchangeHistory } from "./exchange-history.model";
import { User } from "./user.model";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  situation: string;

  @Column()
  offeredBook: string;

  @Column()
  availableBook: string;

  @ManyToOne(() => User, (user) => user.request)
  @JoinColumn()
  user: User[];

  @OneToMany(
    () => ExchangeHistory,
    (exchangeHistory) => exchangeHistory.request
  )
  @JoinColumn()
  exchangeHistory: ExchangeHistory;
}
