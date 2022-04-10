import { Condition, Status } from '../../../../core/enums'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Author } from './author.model';
import { Language } from './language.model';
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

  @ManyToOne(() => Language, (language) => language.book)
  @JoinColumn()
  language!: Language;
  
  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  publisher!: Publisher;
}
