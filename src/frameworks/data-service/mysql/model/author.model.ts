import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Book } from './book.model'
  
  @Entity()
  export class Author {
    @PrimaryGeneratedColumn()
    id!: string;
  
    @Column()
    name: string;

    @OneToMany(() => Book, (book) => book.author)
    book: Book[];
  }
  