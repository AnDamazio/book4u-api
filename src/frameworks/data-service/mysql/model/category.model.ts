import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Book } from './book.model';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ default: 'Filosofia' })
  name!: string;
}
