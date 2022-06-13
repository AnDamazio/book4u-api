import { UserServices } from "src/service";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";
import * as jwt from "jsonwebtoken";
import {
  ExchangeHistory,
  ExchangeHistoryDto,
  ExchangeType,
  Status,
} from "src/core";
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  UseGuards,
} from "@nestjs/common";
import { BookServices, BookFactoryService } from "../service/use-cases/book/";
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
  ) {}

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
      const findedAutoRelation = await this.requestServices.findExchangeById(
        id
      );
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
        console.log(
          findedAutoRelation.book1.owner,
          findedAutoRelation.book2.owner
        );
        exchangeHistory.exchangeType = ExchangeType.LIVRO;
        await this.exchangeHistory.saveRegistry(exchangeHistory);

        // exchangeHistory.exchangeDate = "";
        // exchangeHistory.request = [findedAutoRelation];
        // exchangeHistory.exchangeWithCredit = [];
        // exchangeHistory.user = [findedAutoRelation.book2.owner];
        // exchangeHistory.exchangeType = ExchangeType.LIVRO;
        // await this.exchangeHistory.saveRegistry(exchangeHistory);
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
      const findNotification =
        await this.requestServices.exchangeNotificationOwner1(token);
      if (findNotification.length > 0) {
        return await Promise.all(
          findNotification.map(async (notifications) => {
            const id = await this.requestServices.getIdFromExchange(
              notifications
            );
            return {
              tradeId: id,
              situation: notifications.situation,
              bookRequired: {
                name: notifications.book2.name,
                owner:
                  notifications.book2.owner.firstName +
                  " " +
                  notifications.book2.owner.lastName,
                ownerState: notifications.book2.owner.personalData.state || "",
                ownerCity: notifications.book2.owner.personalData.city || "",
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
  async getExchangeInfoNotification(@Param("token") token: string) {
    try {
      const findNotification =
        await this.requestServices.exchangeNotificationOwner2(token);
      if (findNotification.length > 0) {
        return await Promise.all(
          findNotification.map(async (notifications) => {
            const id = await this.requestServices.getIdFromExchange(
              notifications
            );
            if (notifications.book2.owner.personalData.token == token) {
              return {
                text: `O usuário ${
                  notifications.book1.owner.firstName +
                  " " +
                  notifications.book1.owner.lastName
                } deseja realizar uma troca`,
                tradeId: id,
                bookOffered: {
                  name: notifications.book1.name,
                  bookImages: notifications.book1.bookImages,
                  owner1:
                    notifications.book1.owner.firstName +
                    " " +
                    notifications.book1.owner.lastName,
                  owner1State:
                    notifications.book1.owner.personalData.state || "",
                  owner1City: notifications.book1.owner.personalData.city || "",
                },
                requiredBook: {
                  name: notifications.book2.name,
                  bookImages: notifications.book2.bookImages,
                  owner2:
                    notifications.book2.owner.firstName +
                    " " +
                    notifications.book2.owner.lastName,
                  owner2State:
                    notifications.book1.owner.personalData.state || "",
                  owner2City: notifications.book1.owner.personalData.city || "",
                },
              };
            }
          })
        );
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
        const buyerId = await this.userServices.getIdFromUser(
          findedCreditExchange.user
        );
        console.log(buyerId);
        const buyerFound = await this.userServices.getUserById(buyerId);
        console.log(buyerFound);
        const buyerCredit =
          Number(buyerFound.credits) - Number(findedCreditExchange.book.price);
        buyerFound.credits = String(buyerCredit);

        await this.userServices.updateUser(Number(buyerId), buyerFound);

        const sellerId = await this.userServices.getIdFromUser(
          findedCreditExchange.book.owner
        );
        const sellerFound = await this.userServices.getUserById(sellerId);
        const sellerCredit =
          Number(sellerFound.credits) + Number(findedCreditExchange.book.price);
        sellerFound.credits = String(sellerCredit);
        await this.userServices.updateUser(Number(sellerId), sellerFound);

        findedCreditExchange.situation = ExchangeSituation.CONFIRMADO;
        findedCreditExchange.book.status = Status.INDISPONIVEL;
        const bookId = await this.bookServices.getIdFromBook(
          findedCreditExchange.book
        );
        await this.bookServices.updateBook(bookId, findedCreditExchange.book);
        await this.exchangeWithCreditServices.updateExchangeBooks(
          id,
          findedCreditExchange
        );

        exchangeHistory.exchangeDate = "";
        exchangeHistory.request = [];
        console.log(findedCreditExchange);
        exchangeHistory.exchangeWithCredit = [findedCreditExchange];
        exchangeHistory.user = [findedCreditExchange.user];
        exchangeHistory.exchangeType = ExchangeType.PONTOS;
        console.log("funfou");
        console.log(await this.exchangeHistory.saveRegistry(exchangeHistory));

        return "Solicitação confirmada";
      } else if (confirm === "Recusado") {
        findedCreditExchange.situation = ExchangeSituation.RECUSADO;
        const bookId = await this.bookServices.getIdFromBook(
          findedCreditExchange.book
        );
        await this.bookServices.updateBook(
          Number(bookId),
          findedCreditExchange.book
        );
        await this.requestServices.updateExchangeBooks(
          id,
          findedCreditExchange
        );
        return "Solicitação Recusada";
      }
    } catch (err) {
      return err.message;
    }
  }

  @Get("creditExchangeInfo/:token")
  async getCreditExhangeInfoNotification(@Param("token") token: string) {
    try {
      const findNotification =
        await this.exchangeWithCreditServices.exchangeNotificationBuyer(token);
      if (findNotification.length > 0) {
        return await Promise.all(
          findNotification.map(async (notifications) => {
            const id = await this.exchangeWithCreditServices.getIdFromExchange(
              notifications
            );
            return {
              tradeId: id,
              situation: notifications.situation,
              bookRequired: notifications.book.name,
              bookImages: notifications.book.bookImages,
              owner:
                notifications.book.owner.firstName +
                " " +
                notifications.book.owner.lastName,
              state: notifications.book.owner.personalData.state || "",
              city: notifications.book.owner.personalData.city || "",
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

  @Get("creditExchangeRequestNotification/:token")
  async getCreditExchangeInfoNotification(@Param("token") token: string) {
    try {
      const findNotification =
        await this.exchangeWithCreditServices.exchangeNotificationOwner(token);
      if (findNotification.length > 0) {
        return await Promise.all(
          findNotification.map(async (notifications) => {
            const id = await this.requestServices.getIdFromExchange(
              notifications
            );
            return {
              tradeId: id,
              situation: notifications.situation,
              creditOffered: {
                credit: notifications.book.price,
                user:
                  notifications.user.firstName +
                  " " +
                  notifications.user.lastName,
                userCity: notifications.user.personalData.city || "",
                userState: notifications.user.personalData.state || "",
              },
              requiredBook: {
                name: notifications.book.name,
                bookImages: notifications.book.bookImages,
                owner:
                  notifications.book.owner.firstName +
                  " " +
                  notifications.book.owner.lastName,
              },
            };
          })
        );
      } else {
        return "Nenhum pedido de troca";
      }
    } catch (err) {
      return err.message;
    }
  }
}
