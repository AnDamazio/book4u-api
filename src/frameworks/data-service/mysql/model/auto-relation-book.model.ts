import { ExchangeSituation } from 'src/core';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Book } from './book.model';

@Entity()
export class AutoRelationBook {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        type: "enum",
        enum: ExchangeSituation,
        default: ExchangeSituation.PENDENTE
    })
    situation: ExchangeSituation

    @ManyToOne(() => Book, book => book.id)
    @JoinColumn()
    book1: Book;

    @ManyToOne(() => Book, book => book.id)
    @JoinColumn()
    book2: Book;
}