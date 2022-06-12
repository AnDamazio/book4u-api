import { ExchangeType } from "src/core";
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

  @Column({
    type: "enum",
    enum: ExchangeType,
  })
  exchangeType: ExchangeType;

  @ManyToOne(() => Request, (request) => request.exchangeHistory, {
    nullable: true,
  })
  @JoinColumn()
  request: Request[];

  @ManyToOne(
    () => ExchangeWithCredit,
    (exchangeWithCredit) => exchangeWithCredit.exchangeHistory,
    {
      nullable: true,
      eager: true,
    }
  )
  @JoinColumn()
  exchangeWithCredit: ExchangeWithCredit[];

  @OneToMany(() => User, (user) => user.exchangeHistory, {
    nullable: true,
  })
  user: User[];
}
