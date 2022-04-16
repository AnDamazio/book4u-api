import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PersonalData } from './personal-data.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  profileImage: string;

  @OneToOne(() => PersonalData)
  @JoinColumn()
  personalData!: PersonalData;
}
