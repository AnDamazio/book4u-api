import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
} from 'typeorm';
import { User } from './user.model';

@Entity()
@Unique(['cpf'])
@Unique(['email'])
@Unique(['rg'])
@Unique(['cellphone'])
@Unique(['telephone'])
export class PersonalData {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column()
  password!: string;

  @Column({ name: 'cpf' })
  cpf!: string;

  @Column({ name: 'rg' })
  rg!: string;

  @Column()
  cellphone!: string;

  @Column()
  telephone!: string;

  @OneToOne(() => User, (user) => user.personalData)
  user: User;
}
