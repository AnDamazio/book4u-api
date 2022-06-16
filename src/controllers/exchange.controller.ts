import { UserServices } from "src/service";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";
import * as jwt from "jsonwebtoken";
import { Status } from "src/core";
import { ExchangeHistory, ExchangeHistoryDto, ExchangeType } from "src/core";
import { Controller, Post, Get, Put, Param, UseGuards } from "@nestjs/common";
import { BookServices } from "../service/use-cases/book/";
import { ExchangeWithCreditServices } from "../service/use-cases/exchange-with-credit";
import { RequestServices } from "../service/use-cases/request";
import { ExchangeSituation } from "./../core/enums/exchange-situation.enum";
import { ExchangeHistoryServices } from "src/service/use-cases/exchange-history";

@Controller("api/exchange")
@UseGuards(JwtAuthGuard)
export class ExchangeController {
  constructor(
    private bookServices: BookServices,
    private userServices: UserServices,
    private exchangeWithCreditServices: ExchangeWithCreditServices,
    private requestServices: RequestServices,
    private exchangeHistory: ExchangeHistoryServices
  ) { }

  @Post("exchangeBookWithBook/:book1/:book2")
  async createExchangeBooks(
    @Param("book1") book1: number,
    @Param("book2") book2: number
  ) {
    try {
      const getBook1 = await this.bookServices.findBookByPk(book1);
      const getBook2 = await this.bookServices.findBookByPk(book2);
      const createExchangeBooksDto = {
        situation: ExchangeSituation.PENDENTE,
        book1: getBook1,
        book2: getBook2,
        createdAt: String(Date.now()),
      };
      getBook1.status = "Indisponível";
      await this.bookServices.updateBook(book1, getBook1);
      await this.bookServices.updateBook(book2, getBook2);
      const getIdFromExchange = await this.requestServices.createExchangeBooks(
        createExchangeBooksDto
      );
      return {
        text: "Solicitado com sucesso",
        idFromExchange: await this.requestServices.getIdFromExchange(
          getIdFromExchange
        ),
      };
    } catch (err) {
      return err.message;
    }
  }

  @Put("confirmExchangeBook/:id/:confirm")
  async confirmExchangeBook(
    @Param("confirm") confirm: string,
    @Param("id") id: number
  ) {
    try {
      const findedAutoRelation = await this.requestServices.findExchangeById(id);
      let exchangeHistory = new ExchangeHistoryDto();
      if (confirm === "Confirmado") {
        findedAutoRelation.situation = ExchangeSituation.CONFIRMADO;
        findedAutoRelation.book2.status = Status.INDISPONIVEL;
        const bookId = await this.bookServices.getIdFromBook(
          findedAutoRelation.book2
        );
        await this.bookServices.updateBook(bookId, findedAutoRelation.book2);
        await this.requestServices.updateExchangeBooks(id, findedAutoRelation);

        if (findedAutoRelation.book1.price > findedAutoRelation.book2.price) {
          const calcPoints =
            Number(findedAutoRelation.book1.price) -
            Number(findedAutoRelation.book2.price);
          const pointsToString = String(
            Number(findedAutoRelation.book1.owner.credits) + calcPoints
          );
          findedAutoRelation.book1.owner.credits = pointsToString;
          const userId = await this.userServices.getIdFromUser(
            findedAutoRelation.book1.owner
          );
          await this.userServices.updateUser(
            Number(userId),
            findedAutoRelation.book1.owner
          );
          return "Troca confirmada";
        } else if (
          findedAutoRelation.book2.price > findedAutoRelation.book1.price
        ) {
          const calcPoints =
            Number(findedAutoRelation.book2.price) -
            Number(findedAutoRelation.book1.price);
          const pointsToString = String(
            Number(findedAutoRelation.book2.owner.credits) + calcPoints
          );
          findedAutoRelation.book2.owner.credits = pointsToString;
          const userId = await this.userServices.getIdFromUser(
            findedAutoRelation.book2.owner
          );
          await this.userServices.updateUser(
            Number(userId),
            findedAutoRelation.book2.owner
          );
          return "Troca confirmada";
        }

        exchangeHistory.exchangeDate = "";
        exchangeHistory.request = [findedAutoRelation];
        exchangeHistory.exchangeWithCredit = [];
        exchangeHistory.user = [
          findedAutoRelation.book1.owner,
          findedAutoRelation.book2.owner,
        ];
        exchangeHistory.exchangeType = ExchangeType.LIVRO;
        await this.exchangeHistory.saveRegistry(exchangeHistory);

        return "Troca confirmada";
      } else if (confirm === "Recusado") {
        findedAutoRelation.situation = ExchangeSituation.RECUSADO;
        findedAutoRelation.book1.status = "Disponível";
        const bookId = await this.bookServices.getIdFromBook(
          findedAutoRelation.book1
        );
        await this.bookServices.updateBook(
          Number(bookId),
          findedAutoRelation.book1
        );
        await this.requestServices.updateExchangeBooks(id, findedAutoRelation);
        return "Solicitação Recusada";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Get("exchangeInfo/:token")
  async getExhangeInfoNotification(@Param("token") token: string) {
    try {
      const findNotification = await this.requestServices.exchangeNotificationOwner1(token);
      if (findNotification.length > 0) {
        return await Promise.all(
          findNotification.map(async (notifications) => {
            const id = await this.requestServices.getIdFromExchange(notifications);
            const userId = await this.userServices.getIdFromUser(notifications.book2.owner)
            const userFound = await this.userServices.getUserById(Number(userId))
            return {
              tradeId: id,
              situation: notifications.situation,
              bookRequired: {
                name: notifications.book2.name,
                bookImage: notifications.book2.bookImages.frontSideImage,
                author: notifications.book2.author,
                owner: notifications.book2.owner.firstName + " " + notifications.book2.owner.lastName,
                ownerPicture: notifications.book2.owner.picture,
                ownerState: userFound.personalData.state || "",
                ownerCity: userFound.personalData.city || "",
              },
            };
          })
        );
      } else {
        return "Sem notificações";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Get("exchangeRequestNotification/:token")
  async getExchangeRequestNotification(@Param("token") token: string) {
    try {
      const findNotification = await this.requestServices.exchangeNotificationOwner2(token);
      if (findNotification.length > 0) {
        return await Promise.all(
          findNotification.map(async (notifications) => {
            const id = await this.requestServices.getIdFromExchange(notifications);
            const userId = await this.userServices.getIdFromUser(notifications.book1.owner)
            const userFound = await this.userServices.getUserById(Number(userId))
            return {
              tradeId: id,
              situation: notifications.situation,
              userRequested: {
                owner: userFound.firstName + " " + userFound.lastName,
                picture: userFound.picture,
                state: userFound.personalData.state || '',
                city: userFound.personalData.city || ''
              }
            }
          }))
      } else {
        return "Nenhum pedido de troca";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Post("exchangeCreditsWithBook/:token/:bookRequired")
  async createExchangeCreditsWithBook(
    @Param("bookRequired") bookRequired: number,
    @Param("token") token: string
  ) {
    try {
      const book = await this.bookServices.findBookByPk(bookRequired);
      const destructToken: any = jwt.decode(token);
      const user = await this.userServices.findByEmail(destructToken.email);

      if (Number(user.credits) >= Number(book.price)) {
        const exchangeCreditWithBook = {
          user: user,
          book: book,
          situation: ExchangeSituation.PENDENTE,
          createdAt: String(Date.now()),
        };
        return {
          text: "Proposta enviada",
          tradeId: await this.exchangeWithCreditServices.getIdFromExchange(
            await this.exchangeWithCreditServices.createExchangeWithCredit(
              exchangeCreditWithBook
            )
          ),
        };
      } else {
        return "Créditos insuficientes";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Put("confirmCreditExchange/:id/:confirm")
  async confirmCreditExchange(
    @Param("confirm") confirm: string,
    @Param("id") id: number
  ) {
    try {
      const exchangeHistory = new ExchangeHistoryDto();
      const findedCreditExchange =
        await this.exchangeWithCreditServices.findById(Number(id));
      if (confirm === "Confirmado") {
        const buyerId = await this.userServices.getIdFromUser(findedCreditExchange.user);
        const buyerFound = await this.userServices.getUserById(buyerId);
        const buyerCredit = Number(buyerFound.credits) - Number(findedCreditExchange.book.price);
        buyerFound.credits = String(buyerCredit);
        await this.userServices.updateUser(Number(buyerId), buyerFound);

        const sellerId = await this.userServices.getIdFromUser(findedCreditExchange.book.owner);
        const sellerFound = await this.userServices.getUserById(sellerId);
        const sellerCredit = Number(sellerFound.credits) + Number(findedCreditExchange.book.price);
        sellerFound.credits = String(sellerCredit);
        await this.userServices.updateUser(Number(sellerId), sellerFound);

        findedCreditExchange.situation = ExchangeSituation.CONFIRMADO;
        findedCreditExchange.book.status = Status.INDISPONIVEL;
        const bookId = await this.bookServices.getIdFromBook(findedCreditExchange.book);
        await this.bookServices.updateBook(bookId, findedCreditExchange.book);
        await this.exchangeWithCreditServices.updateExchangeBooks(id, findedCreditExchange);

        exchangeHistory.exchangeDate = "";
        exchangeHistory.request = [];
        exchangeHistory.exchangeWithCredit = [findedCreditExchange];
        exchangeHistory.user = [findedCreditExchange.user];
        exchangeHistory.exchangeType = ExchangeType.PONTOS;

        exchangeHistory.user = [findedCreditExchange.user];
        console.log(await this.exchangeHistory.saveRegistry(exchangeHistory));

        return "Solicitação confirmada";
      } else if (confirm === "Recusado") {
        findedCreditExchange.situation = ExchangeSituation.RECUSADO;
        const bookId = await this.bookServices.getIdFromBook(findedCreditExchange.book);
        await this.bookServices.updateBook(Number(bookId), findedCreditExchange.book);
        await this.requestServices.updateExchangeBooks(id, findedCreditExchange);
        return "Solicitação Recusada";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Get("creditExchangeInfo/:token")
  async getCreditExhangeInfoNotification(@Param("token") token: string) {
    try {
      const findNotification = await this.exchangeWithCreditServices.exchangeNotificationBuyer(token)
      if (findNotification.length > 0) {
        return await Promise.all(findNotification.map(async (notifications) => {
          const id = await this.exchangeWithCreditServices.getIdFromExchange(notifications)
          return {
            tradeId: id,
            situation: notifications.situation,
            bookRequired: {
              bookName: notifications.book.name,
              author: notifications.book.author,
              bookImage: notifications.book.bookImages.frontSideImage,
              owner: notifications.book.owner.firstName + " " + notifications.book.owner.lastName,
              picture: notifications.book.owner.picture,
              state: notifications.user.personalData.state || '',
              city: notifications.user.personalData.city || ''
            }
          }
        }))
      } else {
        return "Sem notificações";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Get("creditExchangeRequestNotification/:token")
  async getCreditExchangeInfoNotification(@Param('token') token: string) {
    try {
      const findNotification = await this.exchangeWithCreditServices.exchangeNotificationOwner(token);
      if (findNotification.length > 0) {
        return await Promise.all(findNotification.map(async (notifications) => {
          const id = await this.requestServices.getIdFromExchange(notifications)
          return {
            tradeId: id,
            situation: notifications.situation,
            creditsToReceive: notifications.book.price,
            userRequested: {
              user: notifications.user.firstName + " " + notifications.user.lastName,
              picture: notifications.user.picture,
              state: notifications.user.personalData.state || '',
              city: notifications.user.personalData.city || ''
            }
          }
        }))
      } else {
        return "Nenhum pedido de troca"
      }
    } catch (err) {
      return err.message
    }
  }

  @Get("getRequestById/:id")
  async getRequestById(@Param('id') id: string) {
    try {
      const exchangeFound = await this.requestServices.findExchangeById(Number(id))
      return {
        bookOffered: {
          name: exchangeFound.book1.name,
          author: exchangeFound.book1.author,
          price: exchangeFound.book1.price,
          bookImage: exchangeFound.book1.bookImages.frontSideImage,
          owner: exchangeFound.book1.owner.firstName + " " + exchangeFound.book1.owner.lastName,
          ownerCity: exchangeFound.book1.owner.personalData.city || "",
          ownerState: exchangeFound.book1.owner.personalData.state || "",
          ownerHouseNumber: exchangeFound.book1.owner.personalData.houseNumber,
          ownerStreet: exchangeFound.book1.owner.personalData.streetName,
        },
        requiredBook: {
          name: exchangeFound.book2.name,
          author: exchangeFound.book2.author,
          price: exchangeFound.book2.price,
          bookImage: exchangeFound.book2.bookImages.frontSideImage,
          owner: exchangeFound.book2.owner.firstName + " " + exchangeFound.book2.owner.lastName,
        }
      }
    } catch (err) {
      return err.message
    }
  }

  @Get("getCreditRequestById/:id")
  async getCreditRequestById(@Param('id') id: string) {
    try {
      const exchangeCreditFound = await this.exchangeWithCreditServices.findById(Number(id))
      return {
        creditToReceive: exchangeCreditFound.book.price,
        buyerUser: exchangeCreditFound.user.firstName + " " + exchangeCreditFound.user.lastName,
        buyerCity: exchangeCreditFound.user.personalData.city,
        buyerState: exchangeCreditFound.user.personalData.state,
        buyerHouseNumber: exchangeCreditFound.user.personalData.houseNumber,
        buyerStreet: exchangeCreditFound.user.personalData.streetName,
        requiredBook: {
          name: exchangeCreditFound.book.name,
          author: exchangeCreditFound.book.author,
          price: exchangeCreditFound.book.price,
          bookImage: exchangeCreditFound.book.bookImages.frontSideImage,
          owner: exchangeCreditFound.book.owner
        },
      }
    } catch (err) {
      return err.message
    }
  }
}
