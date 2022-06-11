import { Injectable } from '@nestjs/common';
import { ExchangeWithCredit } from '../../../core/entities/exchange-with-credit.entity';
import { IDataServices } from '../../../core/abstracts';
import { ExchangeWithCreditDto } from '../../../core/dtos';
import { ExchangeWithCreditFactoryService } from './exchange-with-credit-factory.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ExchangeWithCreditServices {
    constructor(
        private dataServices: IDataServices,
        private exchangeWithCreditFactoryService: ExchangeWithCreditFactoryService,
    ) { }

    async createExchangeWithCredit(exchangeWithCreditDto: ExchangeWithCreditDto): Promise<ExchangeWithCredit> {
        return await this.dataServices.exchangeWithCredit.createExchangeWithCredit(exchangeWithCreditDto)
    }

    async exchangeNotificationBuyer(token: string): Promise<ExchangeWithCredit[]> {
        return await this.dataServices.exchangeWithCredit.exchangeNotificationBuyer(token)
    }

    async exchangeNotificationOwner(token: string): Promise<ExchangeWithCredit[]> {
        return await this.dataServices.exchangeWithCredit.exchangeNotificationOwner(token)
    }

    async updateExchangeBooks(id: number, exchange): Promise<UpdateResult> {
        return await this.dataServices.exchangeWithCredit.updateExchangeBooks(id, exchange)
    }

    async getIdFromExchange(exchange): Promise<Number> {
        return await this.dataServices.exchangeWithCredit.getIdByExchange(exchange)
    }

    async findById(id: number): Promise<ExchangeWithCredit> {
        return await this.dataServices.exchangeWithCredit.findCreditExchangeById(id)
    }
}