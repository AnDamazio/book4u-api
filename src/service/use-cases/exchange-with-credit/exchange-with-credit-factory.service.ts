import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, ExchangeWithCreditDto } from '../../../core/dtos';
import { ExchangeWithCredit } from 'src/core/entities/exchange-with-credit.entity';

@Injectable()
export class ExchangeWithCreditFactoryService {
    createNewCategory(createExchangeWithCreditDto: ExchangeWithCreditDto) {
        const newExchangeWithCredit = new ExchangeWithCredit();
        newExchangeWithCredit.createdAt = createExchangeWithCreditDto.createdAt;
        newExchangeWithCredit.book = createExchangeWithCreditDto.book;
        newExchangeWithCredit.user = createExchangeWithCreditDto.user;
        newExchangeWithCredit.situation = createExchangeWithCreditDto.situation;
        newExchangeWithCredit.readBuyer = createExchangeWithCreditDto.readBuyer;
        newExchangeWithCredit.readOwner = createExchangeWithCreditDto.readOwner;
        return newExchangeWithCredit;
    }
}
