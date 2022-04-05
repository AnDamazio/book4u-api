import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { Author } from './author.model';
  
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

    @Column()
    status!: string;

    @Column()
    condition!: string;
  
    @ManyToOne(() => Author, author => author.book)
    @JoinColumn()
    author!: Author;
  }