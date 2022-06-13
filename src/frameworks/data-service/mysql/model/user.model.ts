import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from "typeorm";
import { Book } from "./book.model";
import { ExchangeHistory } from "./exchange-history.model";
import { PersonalData } from "./personal-data.model";
import { Request } from "./request.model";
import { UserSituation } from "./user-situation.model";
import { Wish } from "./wish.model";

@Entity()
@Unique(["registerNumber"])
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  picture: string;

  @Column()
  registerNumber: string;

  @Column({ default: "0" })
  credits: string;

  @OneToOne(() => PersonalData)
  @JoinColumn()
  personalData!: PersonalData;

  @OneToMany(() => Wish, (wish) => wish.user, { cascade: true })
  wish: Wish;

  @ManyToOne(() => UserSituation, (userSituation) => userSituation.user)
  @JoinColumn()
  userSituation!: UserSituation;

  @OneToMany(() => Book, (book) => book.owner)
  book: Book[];

  @OneToMany(() => ExchangeHistory, (exchange) => exchange.user)
  exchangeHistory: ExchangeHistory;
}
