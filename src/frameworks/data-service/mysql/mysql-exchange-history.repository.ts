import { ExchangeType } from "src/core";
import { IExchangeHistoryRepository } from "src/core/abstracts/exchange-history-repository.abstract";
import { HistoryResponseDto } from "src/core/dtos/history-response.dto";
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
      for (let i = 0; i < exchangeHistory.user.length; i++) {
        await this._repository.query(
          `INSERT INTO exchange_history(exchangeDate, requestId, exchangeWithCreditId, exchangeType, userId)
                 VALUES('${exchangeHistory.exchangeDate}', '${
            exchangeHistory.request[0].id
          }', ${null}, 'LIVRO', '${exchangeHistory.user[i].id}')`
        );
      }
    } else {
      if (exchangeHistory.exchangeType == ExchangeType.PONTOS) {
        const date = new Date().toLocaleDateString();
        const day = date.slice(0, 2);
        const month = date.slice(3, 5);
        const year = date.slice(6, 10);

        exchangeHistory.exchangeDate = `${year}-${month}-${day}`;
        return await this._repository.query(
          `INSERT INTO exchange_history(exchangeDate, requestId, exchangeWithCreditId, exchangeType, userId)
                     VALUES('${exchangeHistory.exchangeDate}', ${null}, '${
            exchangeHistory.exchangeWithCredit[0].id
          }', 'PONTOS', '${exchangeHistory.user[0].id}')`
        );
      }
    }
  }

  async findOne(userId: number): Promise<any> {
    const historyArray = [];

    const book1 = await this._repository.query(`select book.*
      from exchange_history
      cross join request
      cross join book
      where exchange_history.userId = ${userId} and request.id = exchange_history.requestId and book.id = request.book1Id
      group by exchange_history.id;`);

    const book2 = await this._repository.query(`select book.*
    from exchange_history
    cross join request
    cross join book
    where exchange_history.userId = ${userId} and request.id = exchange_history.requestId and book.id = request.book2Id
    group by exchange_history.id;`);

    for (let i = 0; i < book1.length; i++) {
      const history = new HistoryResponseDto();

      const dono1 = await this._repository.query(`
    select user.firstName, user.lastName, user.picture, personal_data.streetName, personal_data.complement,
    personal_data.zipCode, personal_data.houseNumber, personal_data.district, personal_data.city, personal_data.state
    from user
    cross join personal_data
    cross join book
    where book.ownerId = ${book1[i].ownerId} and personal_data.id = user.personalDataId and user.id = ${book1[i].ownerId}
    group by user.id;`);

      history.solicitante = dono1[0];
      history.ofertado = await book1[i];
      history.recebido = await book2[i];

      historyArray.push(history);
    }
    return historyArray;
  }
}
