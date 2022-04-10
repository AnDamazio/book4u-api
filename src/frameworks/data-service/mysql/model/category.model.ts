import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from 'typeorm';
import { Book } from './book.model';

@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'name' })
  name!: string;

  @ManyToMany(() => Book, (book) => book.category)
  book!: Book[];
}
