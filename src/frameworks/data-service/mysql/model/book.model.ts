import { Condition, Status } from 'src/core';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Author } from './author.model';
import { Category } from './category.model';
import { Publisher } from './publisher.model';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  pagesQuantity!: number;

  @Column()
  synopsis!: string;

  @Column({ type: 'enum', enum: Status, default: Status.DISPONIVEL })
  status!: Status;

  @Column({ type: 'enum', enum: Condition, default: Condition.USADO })
  condition!: Condition;

  @ManyToOne(() => Author, (author) => author.book)
  @JoinColumn()
  author!: Author;

  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  publisher!: Publisher;

  @ManyToMany(() => Category, (category) => category.book)
  category!: Category;
}
