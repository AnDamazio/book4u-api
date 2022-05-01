import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
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
  profileImage: string;

  @Column()
  registerNumber: string;

  @OneToOne(() => PersonalData)
  @JoinColumn()
  personalData!: PersonalData;

  @ManyToOne(() => UserSituation, (userSituation) => userSituation.user)
  @JoinColumn()
  userSituation!: UserSituation;
}
