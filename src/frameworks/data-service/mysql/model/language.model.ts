import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import {Book} from './book.model';


@Unique(['name'])
@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  book: Book[];
}
