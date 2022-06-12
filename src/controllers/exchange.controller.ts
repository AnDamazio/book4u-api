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
            const findedAutoRelation = await this.requestServices.findExchangeById(
                id
            );
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

    @Get("exchangeInfo/:token")
    async getExhangeInfoNotification(@Param("token") token: string) {
        try {
            const findNotification =
                await this.requestServices.exchangeNotificationOwner1(token);
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
    async getExchangeInfoNotification(@Param('token') token: string) {
        try {
            const findNotification = await this.requestServices.exchangeNotificationOwner2(token);
            if (findNotification.length > 0) {
                return await Promise.all(findNotification.map(async (notifications) => {
                    const id = await this.requestServices.getIdFromExchange(notifications)
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
                return "Nenhum pedido de troca"
            }
        } catch (err) {
            return err.message
        }
    }

    @Put("confirmCreditExchange/:id/:confirm")
    async confirmCreditExchange(
        @Param("confirm") confirm: string,
        @Param("id") id: number
    ) {
        try {
            const findedCreditExchange = await this.exchangeWithCreditServices.findById(Number(id))
            if (confirm === "Confirmado") {
                const buyerId = await this.userServices.getIdFromUser(findedCreditExchange.user)
                console.log(buyerId)
                const buyerFound = await this.userServices.getUserById(buyerId)
                console.log(buyerFound)
                const buyerCredit = Number(buyerFound.credits) - Number(findedCreditExchange.book.price)
                buyerFound.credits = String(buyerCredit)

                await this.userServices.updateUser(Number(buyerId), buyerFound);

                const sellerId = await this.userServices.getIdFromUser(findedCreditExchange.book.owner)
                const sellerFound = await this.userServices.getUserById(sellerId)
                const sellerCredit = Number(sellerFound.credits) + Number(findedCreditExchange.book.price)
                sellerFound.credits = String(sellerCredit);
                await this.userServices.updateUser(Number(sellerId), sellerFound)

                findedCreditExchange.situation = ExchangeSituation.CONFIRMADO;
                findedCreditExchange.book.status = Status.INDISPONIVEL;
                const bookId = await this.bookServices.getIdFromBook(findedCreditExchange.book)
                await this.bookServices.updateBook(bookId, findedCreditExchange.book);
                await this.exchangeWithCreditServices.updateExchangeBooks(id, findedCreditExchange);

                return "Solicitação confirmada"
            } else if (confirm === "Recusado") {
                findedCreditExchange.situation = ExchangeSituation.RECUSADO;
                const bookId = await this.bookServices.getIdFromBook(findedCreditExchange.book)
                await this.bookServices.updateBook(Number(bookId), findedCreditExchange.book)
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
            const findNotification = await this.exchangeWithCreditServices.exchangeNotificationBuyer(token)
            if (findNotification.length > 0) {
                return await Promise.all(findNotification.map(async (notifications) => {
                    const id = await this.exchangeWithCreditServices.getIdFromExchange(notifications)
                    return {
                        tradeId: id,
                        situation: notifications.situation,
                        bookRequired: notifications.book.name,
                        bookImages: notifications.book.bookImages,
                        owner: notifications.book.owner.firstName + " " + notifications.book.owner.lastName,
                        ownerPicture: notifications.book.owner.picture,
                        state: notifications.book.owner.personalData.state || '',
                        city: notifications.book.owner.personalData.city || ''
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
                        creditOffered: {
                            credit: notifications.book.price,
                            user: notifications.user.firstName + " " + notifications.user.lastName,
                            userPicture: notifications.user.picture,
                            userCity: notifications.user.personalData.city || '',
                            userState: notifications.user.personalData.state || ''
                        }
                    }
                }
                ))
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
                    images: exchangeFound.book1.bookImages,
                    owner: exchangeFound.book1.owner
                },
                requiredBook: {
                    name: exchangeFound.book2.name,
                    author: exchangeFound.book2.author,
                    price: exchangeFound.book2.price,
                    images: exchangeFound.book2.bookImages,
                    owner: exchangeFound.book2.owner
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
                requiredBook: {
                    name: exchangeCreditFound.book.name,
                    author: exchangeCreditFound.book.author,
                    price: exchangeCreditFound.book.price,
                    images: exchangeCreditFound.book.bookImages,
                    owner: exchangeCreditFound.book.owner
                },
            }
        } catch (err) {
            return err.message
        }
    }
}
