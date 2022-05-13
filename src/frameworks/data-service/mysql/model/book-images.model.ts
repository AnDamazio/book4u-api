import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { Book } from './book.model';

@Entity()
export class BookImages {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    frontSideImage: string;

    @Column()
    rightSideImage: string;

    @Column()
    leftSideImage: string;

    @Column()
    backSideImage: string;

    @OneToMany(() => Book, (book) => book.bookImages)
    book: Book[];
}
