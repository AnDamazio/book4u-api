import { ExchangeSituation, ReadNotification } from "src/core";
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

  @Column({
    type: "enum",
    enum: ReadNotification,
    default: ReadNotification.NONREAD,
  })
  readBuyer: ReadNotification;

  @Column({
    type: "enum",
    enum: ReadNotification,
    default: ReadNotification.NONREAD,
  })
  readOwner: ReadNotification;

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
