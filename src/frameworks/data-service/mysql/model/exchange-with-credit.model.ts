import { ExchangeSituation } from "src/core";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Book } from "./book.model";
import { ExchangeHistory } from "./exchange-history.model";
import { User } from "./user.model";

@Entity()
export class ExchangeWithCredit {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  createdAt: string;

  @Column({
    type: "enum",
    enum: ExchangeSituation,
    default: ExchangeSituation.PENDENTE,
  })
  situation: ExchangeSituation;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn()
  book: Book;

  @OneToMany(
    () => ExchangeHistory,
    (exchangeHistory) => exchangeHistory.request,
    {
      cascade: true,
    }
  )
  exchangeHistory: ExchangeHistory;
}
