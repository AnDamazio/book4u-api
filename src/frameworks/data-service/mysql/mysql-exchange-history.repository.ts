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
    let { languageId, publisherId, bookImagesId, synopsis, id, ...book } = obj;
    return book;
  };

  async create(exchangeHistory: any): Promise<T> {
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
      cross join author
      where exchange_history.userId = ${userId} and request.id = exchange_history.requestId and book.id = request.book1Id
      group by exchange_history.id;`);
    let book2 = await this._repository.query(`select book.*
    from exchange_history
    cross join request
    cross join book
    cross join author
    where exchange_history.userId = ${userId} and request.id = exchange_history.requestId and book.id = request.book2Id
    group by exchange_history.id;`);
    for (let i = 0; i < book1.length; i++) {
      let author1 = await this._repository.query(`select author.name
      from author
      cross join book
      where book.authorId = author.id and book.id = ${book1[i].id};`);
      let author2 = await this._repository.query(`select author.name
      from author
      cross join book
      where book.authorId = author.id and book.id = ${book2[i].id};`);
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
      personal_data.zipCode, personal_data.houseNumber, personal_data.district, personal_data.city, personal_data.state, user.id as identificator
      from user
      cross join personal_data
      cross join book
      where book.ownerId = ${book1[i].ownerId} and personal_data.id = user.personalDataId and user.id = ${book1[i].ownerId}
      group by user.id;`);
      const dono2 = await this._repository.query(`
      select user.firstName, user.lastName, personal_data.streetName, personal_data.complement,
      personal_data.zipCode, personal_data.houseNumber, personal_data.district, personal_data.city, personal_data.state, user.id as identificator
      from user
      cross join personal_data
      cross join book
      where book.ownerId = ${book2[i].ownerId} and personal_data.id = user.personalDataId and user.id = ${book2[i].ownerId}
      group by user.id;`);
      book1[i]["images"] = book1["imagesId"];
      book1[i]["author"] = book1["authorId"];
      book1[i].author = { ...author1["0"] };
      delete book1[i]["imagesId"];
      delete book1[i]["authorId"];
      book2[i]["images"] = book2["imagesId"];
      book2[i]["author"] = book2["authorId"];
      book2[i].author = { ...author2["0"] };
      delete book2[i]["authorId"];
      delete book2[i]["imagesId"];
      book1[i].images = { ...(await images1)["0"] };
      book2[i].images = { ...(await images2)["0"] };

      history.id = i;
      history.situation = historyDatabase[i].situation;
      history.exchangeDate = historyDatabase[i].exchangeDate;

      let { identificator, ...reqDono } = dono2[0];

      history.requester = reqDono;
      history.offered = this.clean(book1[i]);
      history.received = this.clean(book2[i]);
      history.type = "BOOK";
      historyArray.push(history);
    }
    return historyArray;
  }

  async findOneCreditExchanges(userId: number): Promise<any> {
    console.log(userId);
    let history = await this._repository.query(`select * from exchange_history
    cross join exchange_with_credit
    where exchange_history.userId = ${userId} and exchange_with_credit.id = exchange_history.exchangeWithCreditId
    group by exchange_history.id;`);
    let historyArray = [];
    console.log(history);

    for (let i = 0; i < history.length; i++) {
      const historyResponse = new HistoryResponseDto();
      console.log(history[i].bookId);

      let book = await this._repository.query(`

        select book.name, book.pagesQuantity, book.price, book.ownerId, book.id
        from exchange_history
        cross join exchange_with_credit
        cross join book
        cross join book_images
        where exchange_with_credit.bookId = book.bookImagesId and exchange_history.exchangeWithCreditId = exchange_with_credit.id and book.id = ${history[i].bookId}
        group by exchange_with_credit.id;`);
      console.log(book);

      let author = await this._repository.query(`select author.name
        from author
        cross join book
        where book.authorId = author.id and book.id = ${book[0].id};`);

      book[0]["author"] = book["authorId"];
      book[0].author = { ...author["0"] };
      delete book[0]["authorId"];

      const images = await this._repository
        .query(`select book_images.frontSideImage
      from book
      cross join book_images
      where book_images.id = book.bookImagesId and book.id = ${book[0].id};`);
      book[0].images = { ...(await images)["0"] };

      const dono = await this._repository.query(`
      select user.firstName, user.lastName, user.picture, personal_data.streetName, personal_data.complement,
      personal_data.zipCode, personal_data.houseNumber, personal_data.district, personal_data.city, personal_data.state
      from user
      cross join personal_data
      cross join book
      where book.ownerId = ${book[0].ownerId} and personal_data.id = user.personalDataId and user.id = ${book[0].ownerId}
      group by user.id;`);

      const user = await this._repository
        .query(`select user.firstName, user.lastName, user.picture, personal_data.streetName, personal_data.complement,
      personal_data.zipCode, personal_data.houseNumber, personal_data.district, personal_data.city, personal_data.state
      from user
      cross join personal_data
      where personal_data.id = user.personalDataId and user.id = ${userId}
      group by user.id;`);

      historyResponse.id = history[i].id;
      historyResponse.situation = history[i].situation;
      historyResponse.exchangeDate = history[i].exchangeDate;
      historyResponse.offered = book[0];
      historyResponse.received = book[0].price;
      historyResponse.requester = { ...user["0"] };
      history.type = "CREDIT";

      historyArray.push(historyResponse);
    }
    console.log(historyArray);
    return historyArray;
  }
}
