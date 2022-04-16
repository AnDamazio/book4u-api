import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from 'typeorm';
import { EnumCategory } from './../../../../core/enums';
import { Book } from './book.model';

@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'enum', enum: EnumCategory })
  name!: string;
}
