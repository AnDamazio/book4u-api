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
import { Request } from "./request.model";
import { User } from "./user.model";

@Entity()
export class ExchangeHistory {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  exchangeDate: string;

  @OneToMany(() => Request, (request) => request.exchangeHistory)
  @JoinColumn()
  request: Request[];
}
