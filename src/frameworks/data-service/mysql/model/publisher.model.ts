import { Book } from './book.model';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Publisher {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'name' })
  name!: string;

  @OneToMany(() => Book, (book) => book.publisher)
  book: Book[];
}
