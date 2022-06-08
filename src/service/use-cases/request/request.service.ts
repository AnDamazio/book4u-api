import { Injectable } from '@nestjs/common';
import { Request } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { RequestDto } from '../../../core/dtos';;
import { UpdateResult } from 'typeorm';

@Injectable()
export class RequestServices {
  constructor(
    private dataServices: IDataServices
  ) { }

  async createExchangeBooks(
    requestDto: RequestDto,
  ): Promise<Request> {
    return await this.dataServices.request.createExchangeBooks(
      requestDto,
    );
  }

  async exchangeNotification(token: string): Promise<Request> {
    try {
      return await this.dataServices.request.exchangeNotification(token)
    } catch (err) {
      return err.message
    }
  }

  async updateExchangeBooks(id: number, book): Promise<UpdateResult> {
    return await this.dataServices.request.updateExchangeBooks(id, book)
  }

  async getIdFromExchange(book): Promise<Request> {
    return await this.dataServices.request.getIdFromExchangeBook(book)
  }

  async findExchangeById(id: number): Promise<Request> {
    return await this.dataServices.request.findExchangeById(id)
  }
}
