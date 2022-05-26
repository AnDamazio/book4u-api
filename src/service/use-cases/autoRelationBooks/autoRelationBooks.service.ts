import { Injectable } from '@nestjs/common';
import { AutoRelationBook } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateExchangeBooksDto } from '../../../core/dtos';
import { AutoRelationBooksFactoryService } from './autoRelationBooks-factory.service';

@Injectable()
export class AutoRelationBooksServices {
  constructor(
    private dataServices: IDataServices,
    private autoRelationBooksFactoryService: AutoRelationBooksFactoryService,
  ) {}

  async createExchangeBooks(
    createExchangeBooksDto: CreateExchangeBooksDto,
  ): Promise<AutoRelationBook> {
    return await this.dataServices.autoRelationBook.createExchangeBooks(
      createExchangeBooksDto,
    );
  }

  async exchangeNotification(id: number): Promise<AutoRelationBook>{
    try{
      return await this.dataServices.autoRelationBook.exchangeNotification(id)
    } catch(err) {
      return err.message
    }
  }
}
