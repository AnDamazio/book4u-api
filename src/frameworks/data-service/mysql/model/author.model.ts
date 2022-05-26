import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Book } from './book.model';

@Entity()
@Unique(['name'])
export class Author {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  book: Book[];
}
