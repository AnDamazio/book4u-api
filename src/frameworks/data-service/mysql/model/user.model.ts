import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Book } from './book.model';
import { PersonalData } from './personal-data.model';
import { UserSituation } from './user-situation.model';

@Entity()
@Unique(['registerNumber'])
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

  @OneToOne(() => PersonalData)
  @JoinColumn()
  personalData!: PersonalData;

  @ManyToOne(() => UserSituation, (userSituation) => userSituation.user)
  @JoinColumn()
  userSituation!: UserSituation;

  @OneToMany(() => Book, (book) => book.owner)
  book: Book[];
}
