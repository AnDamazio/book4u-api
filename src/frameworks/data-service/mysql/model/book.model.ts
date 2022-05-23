import { Condition, Status } from '../../../../core/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Author } from './author.model';
import { Language } from './language.model';
import { Category } from './category.model';
import { Publisher } from './publisher.model';
import { BookImages } from './book-images.model';
import { User } from './user.model';
import { Wish } from './wish.model';
import { AutoRelationBook } from './auto-relation-book.model';

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
  price: string;

  @Column({ type: 'enum', enum: Status, default: Status.DISPONIVEL })
  status!: Status;

  @Column({ type: 'enum', enum: Condition, default: Condition.USADO })
  condition!: Condition;

  @ManyToOne(() => Author, (author) => author.book)
  @JoinColumn()
  author!: Author;

  @Column()
  createdAt!: string;

  @ManyToOne(() => Language, (language) => language.book)
  @JoinColumn()
  language!: Language;

  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  publisher!: Publisher;

  @ManyToMany(() => Category, {
    cascade: ['insert'],
  })
  @JoinTable({
    joinColumn: {
      name: 'book',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      referencedColumnName: 'id',
    },
  })
  category: Category[];

  @ManyToOne(() => BookImages, (bookImages) => bookImages.book, {
    cascade: true,
  })
  @JoinColumn()
  bookImages: BookImages;

  @ManyToOne(() => User, (user) => user.book, { cascade: true })
  @JoinColumn()
  owner: User;

  @OneToMany(() => AutoRelationBook, (autoRelationBook) => autoRelationBook.id)
  autoRelationBook: AutoRelationBook[]

  @ManyToOne(() => AutoRelationBook, (autoRelationBook) => autoRelationBook.book1 && autoRelationBook.book2)
  autoRelationBooks: AutoRelationBook
}
