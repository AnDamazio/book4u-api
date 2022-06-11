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
import { ExchangeWithCredit } from "./exchange-with-credit.model";
import { Request } from "./request.model";
import { User } from "./user.model";

@Entity()
export class ExchangeHistory {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  exchangeDate: string;

  @ManyToOne(() => Request, (request) => request.exchangeHistory)
  @JoinColumn()
  request: Request[];

  @ManyToOne(() => ExchangeWithCredit, (exchangeWithCredit) => exchangeWithCredit.exchangeHistory)
  @JoinColumn()
  exchangeWithCredit: ExchangeWithCredit[];
}
