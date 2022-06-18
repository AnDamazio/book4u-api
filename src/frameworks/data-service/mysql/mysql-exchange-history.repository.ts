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

  clean = (obj) => {
    let { languageId, publisherId, bookImagesId, synopsis, ...book } = obj;
    return book;
  };

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

    let book1 = await this._repository.query(`select book.*
      from exchange_history
      cross join request
      cross join book
      where exchange_history.userId = ${userId} and request.id = exchange_history.requestId and book.id = request.book1Id
      group by exchange_history.id;`);

    let book2 = await this._repository.query(`select book.*
    from exchange_history
    cross join request
    cross join book
    where exchange_history.userId = ${userId} and request.id = exchange_history.requestId and book.id = request.book2Id
    group by exchange_history.id;`);

    for (let i = 0; i < book1.length; i++) {
      const history = new HistoryResponseDto();
      const historyDatabase = await this._repository
        .query(`select * from exchange_history
      cross join request
      where exchange_history.userId = ${userId} and request.id = exchange_history.requestId
      group by exchange_history.id;`);

      const images1 = await this._repository
        .query(`select book_images.frontSideImage
      from book
      cross join book_images
      where book_images.id = book.bookImagesId and book.id = ${book1[i].id};`);

      const images2 = await this._repository
        .query(`select book_images.frontSideImage
      from book
      cross join book_images
      where book_images.id = book.bookImagesId and book.id = ${book2[i].id};`);

      const dono1 = await this._repository.query(`
      select user.firstName, user.lastName, personal_data.streetName, personal_data.complement,
      personal_data.zipCode, personal_data.houseNumber, personal_data.district, personal_data.city, personal_data.state
      from user
      cross join personal_data
      cross join book
      where book.ownerId = ${book1[i].ownerId} and personal_data.id = user.personalDataId and user.id = ${book1[i].ownerId}
      group by user.id;`);

      book1[i].imagesId = await images1;
      book2[i].imagesId = await images2;

      history.id = i
      history.exchangeDate = historyDatabase[i].exchangeDate;
      history.requester = dono1[0];


      history.offered = this.clean(book1[i]);

      history.received = this.clean(book2[i]);

      historyArray.push(history);
    }
    return historyArray;
  }

  async findOneCreditExchanges(userId: number): Promise<any> {
    let history = await this._repository.query(`select * from exchange_history
    cross join exchange_with_credit
    where exchange_history.userId = ${userId} and exchange_with_credit.id = exchange_history.exchangeWithCreditId
    group by exchange_history.id;`);
    let historyArray = [];
    console.log("oie");

    for (let i = 0; i < history.length; i++) {
      const historyResponse = new HistoryResponseDto();

      let book = await this._repository.query(`

        select book.name, book.pagesQuantity, book.price, book.ownerId, book.id
        from exchange_history
        cross join exchange_with_credit
        cross join book
        where exchange_with_credit.bookId = book.id and exchange_history.exchangeWithCreditId = exchange_with_credit.id and book.id = 5
        group by exchange_with_credit.id;`);

      const images = await this._repository.query(`select book_images.*
      from book
      cross join book_images
      where book_images.id = book.bookImagesId and book.id = ${book.id};`);
      book.images = await images;

      const dono = await this._repository.query(`
      select user.firstName, user.lastName, user.picture, personal_data.streetName, personal_data.complement,
      personal_data.zipCode, personal_data.houseNumber, personal_data.district, personal_data.city, personal_data.state
      from user
      cross join personal_data
      cross join book
      where book.ownerId = ${book[0].ownerId} and personal_data.id = user.personalDataId and user.id = ${book[0].ownerId}
      group by user.id;`);

      historyResponse.id = i
      historyResponse.exchangeDate = history.exchangeDate;
      historyResponse.offered = this.clean(await book);
      historyResponse.received = await book.price;
      historyResponse.requester = await dono;
      historyArray.push(historyResponse);
    }
    return historyArray;
  }
}
