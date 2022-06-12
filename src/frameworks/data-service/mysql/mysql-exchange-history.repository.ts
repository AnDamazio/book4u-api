import { ExchangeType } from "src/core";
import { IExchangeHistoryRepository } from "src/core/abstracts/exchange-history-repository.abstract";
import { Repository } from "typeorm";

export class MysqlExchangeHistoryRepository<T>
  implements IExchangeHistoryRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async create(exchangeHistory: any): Promise<T> {
    console.log(exchangeHistory.type);
    if (exchangeHistory.exchangeType == ExchangeType.LIVRO) {
      const date = new Date().toLocaleDateString();
      const day = date.slice(0, 2);
      const month = date.slice(3, 5);
      const year = date.slice(6, 10);

      exchangeHistory.exchangeDate = `${year}-${month}-${day}`;
      return await this._repository.query(
        `INSERT INTO exchange_history(exchangeDate, requestId, exchangeWithCreditId, exchangeType)
               VALUES('${exchangeHistory.exchangeDate}', '${
          exchangeHistory.request[0].id
        }', ${null}, 'LIVRO')`
      );
    } else {
      if (exchangeHistory.exchangeType == ExchangeType.PONTOS) {
        const date = new Date().toLocaleDateString();
        const day = date.slice(0, 2);
        const month = date.slice(3, 5);
        const year = date.slice(6, 10);

        exchangeHistory.exchangeDate = `${year}-${month}-${day}`;
        return await this._repository.query(
          `INSERT INTO exchange_history(exchangeDate, requestId, exchangeWithCreditId, exchangeType)
                     VALUES('${exchangeHistory.exchangeDate}', ${null}, '${
            exchangeHistory.exchangeWithCredit[0].id
          }', 'PONTOS')`
        );
      }
    }
  }
}
