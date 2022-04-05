import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../../../core/dtos';
import { Book } from 'src/core/entities/book.entity';

@Injectable()
export class BookFactoryService {
  createNewBook(createBookDto: CreateBookDto) {
    const newBook = new Book()
    newBook.name = createBookDto.name
    newBook.pagesQuantity = createBookDto.pagesQuantity
    newBook.synopsis = createBookDto.synopsis
    newBook.status = createBookDto.status
    newBook.condition = createBookDto.condition
    newBook.author = createBookDto.author
    return newBook;
  
}}