import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateWishListDto } from "src/core/dtos/wish-list.dto";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";
import { BookServices, UserServices } from "src/service";
import {
  WishFactoryService,
  WishListServices,
} from "src/service/use-cases/wish-list";
import * as jwt from "jsonwebtoken";
import { ExchangeHistoryServices } from "src/service/use-cases/exchange-history";

@Controller("api/history")
@UseGuards(JwtAuthGuard)
export class HistoryController {
  constructor(
    private userServices: UserServices,
    private historyServices: ExchangeHistoryServices
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/:token")
  async createWish(@Param("token") token: string) {
    try {
      const destructToken: any = jwt.decode(token);
      const userFound = await this.userServices.findByEmail(
        destructToken.email
      );
      const id = await this.userServices.getIdFromUser(userFound);
      const user = await this.userServices.getUserById(id);

      return await this.historyServices.findHistory(id as unknown as number);
    } catch (error) {
      return error.message;
    }
  }
}
