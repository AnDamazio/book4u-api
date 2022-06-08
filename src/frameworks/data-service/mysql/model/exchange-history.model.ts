import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
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
}
