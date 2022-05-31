import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../../../core/dtos';
import { Book } from 'src/core/entities/book.entity';

@Injectable()
export class BookFactoryService {
  createNewBook(createBookDto: CreateBookDto) {
    const newBook = new Book();
    newBook.name = createBookDto.name;
    newBook.pagesQuantity = createBookDto.pagesQuantity;
    newBook.synopsis = createBookDto.synopsis;
    newBook.price = createBookDto.price;
    newBook.status = createBookDto.status;
    newBook.condition = createBookDto.condition;
    newBook.createdAt = createBookDto.createdAt;
    newBook.author = createBookDto.author;
    newBook.language = createBookDto.language;
    newBook.publisher = createBookDto.publisher;
    newBook.bookImages = createBookDto.bookImages;
    newBook.owner = createBookDto.owner;
    newBook.bookCategories = createBookDto.bookCategories;
    return newBook;
  }
}
