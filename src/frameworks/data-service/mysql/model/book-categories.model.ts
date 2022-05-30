import { Book } from './book.model';
import { Category } from './category.model';

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class BookCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.bookCategories)
  book: Book;

  @ManyToOne(() => Category, (category) => category.bookCategories)
  category: Category;
}
