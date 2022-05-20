import { Injectable } from '@nestjs/common';
import { CreateExchangeBooksDto } from '../../../core/dtos';
import { AutoRelationBook } from 'src/core/entities/auto-relation-book.entity';

@Injectable()
export class AutoRelationBooksFactoryService {
    createNewAutoRelationBook(createExchangeBooksDto: CreateExchangeBooksDto) {
        const newAutoRelationBook = new AutoRelationBook();
        newAutoRelationBook.situation = createExchangeBooksDto.situation;
        newAutoRelationBook.book1 = createExchangeBooksDto.book1;
        newAutoRelationBook.book2 = createExchangeBooksDto.book2;
    }
}
