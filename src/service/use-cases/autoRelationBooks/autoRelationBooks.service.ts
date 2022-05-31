import { Injectable } from '@nestjs/common';
import { AutoRelationBook } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateExchangeBooksDto } from '../../../core/dtos';
import { AutoRelationBooksFactoryService } from './autoRelationBooks-factory.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AutoRelationBooksServices {
  constructor(
    private dataServices: IDataServices,
    private autoRelationBooksFactoryService: AutoRelationBooksFactoryService,
  ) { }

  async createExchangeBooks(
    createExchangeBooksDto: CreateExchangeBooksDto,
  ): Promise<AutoRelationBook> {
    return await this.dataServices.autoRelationBook.createExchangeBooks(
      createExchangeBooksDto,
    );
  }

  async exchangeNotification(token: string): Promise<AutoRelationBook> {
    try {
      return await this.dataServices.autoRelationBook.exchangeNotification(token)
    } catch (err) {
      return err.message
    }
  }

  async updateExchangeBooks(id: number, book): Promise<UpdateResult> {
    return await this.dataServices.autoRelationBook.updateExchangeBooks(id, book)
  }

  async getIdFromExchange(book): Promise<AutoRelationBook> {
    return await this.dataServices.autoRelationBook.getIdFromExchangeBook(book)
  }

  async findExchangeById(id: number): Promise<AutoRelationBook> {
    return await this.dataServices.autoRelationBook.findExchangeById(id)
  }
}
