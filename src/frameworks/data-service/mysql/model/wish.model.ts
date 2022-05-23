import { User } from './user.model'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Book } from './book.model';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  wishLevel: string;

  @ManyToMany(() => Book, { cascade: ['insert'] })
  @JoinTable({
    name: 'wish_list',
    joinColumn: {
      name: 'wish',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'book',
      referencedColumnName: 'id',
    },
  })
  book: Book[];

  @ManyToOne(() => User, (user) => user.wish)
  user: User;
}
