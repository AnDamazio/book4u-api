import { BookCategories } from './book-categories.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @OneToMany(
    () => BookCategories,
    (bookCategories) => bookCategories.category,
    {
      cascade: true,
    },
  )
  bookCategories: BookCategories[];
}
