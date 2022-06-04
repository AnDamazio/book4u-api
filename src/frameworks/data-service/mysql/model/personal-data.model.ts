import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
} from "typeorm";
import { User } from "./user.model";

@Entity()
@Unique(["cpf"])
@Unique(["email"])
@Unique(["cellphone"])
@Unique(["telephone"])
export class PersonalData {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: "email" })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  streetName: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  houseNumber: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ name: "cpf" })
  cpf!: string;

  @Column()
  cellphone!: string;

  @Column()
  telephone!: string;

  @Column()
  token: string = "";

  @OneToOne(() => User, (user) => user.personalData)
  user: User;
}
