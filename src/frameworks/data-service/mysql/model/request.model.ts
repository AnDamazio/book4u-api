import { ExchangeSituation, ReadNotification } from "src/core";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Book } from "./book.model";
import { ExchangeHistory } from "./exchange-history.model";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: "enum",
    enum: ExchangeSituation,
    default: ExchangeSituation.PENDENTE,
  })
  situation: ExchangeSituation;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn()
  book1: Book;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn()
  book2: Book;

  @Column()
  createdAt: string;

  @Column({
    type: "enum",
    enum: ReadNotification,
    default: ReadNotification.NONREAD,
  })
  readOwner1: ReadNotification;

  @Column({
    type: "enum",
    enum: ReadNotification,
    default: ReadNotification.NONREAD,
  })
  readOwner2: ReadNotification;


  @OneToMany(
    () => ExchangeHistory,
    (exchangeHistory) => exchangeHistory.request,
    {
      cascade: true,
    }
  )
  exchangeHistory: ExchangeHistory;
}
