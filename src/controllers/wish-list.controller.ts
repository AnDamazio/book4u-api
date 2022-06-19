import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateWishListDto } from "src/core/dtos/wish-list.dto";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";
import { BookServices, UserServices } from "src/service";
import {
  WishFactoryService,
  WishListServices,
} from "src/service/use-cases/wish-list";
import * as jwt from "jsonwebtoken";

@Controller("api/wish-list")
@UseGuards(JwtAuthGuard)
export class WishListController {
  constructor(
    private wishServices: WishListServices,
    private wishFactoryService: WishFactoryService,
    private bookServices: BookServices,
    private userServices: UserServices
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("/:bookId/:token")
  async createWish(
    @Body() wishDto: CreateWishListDto,
    @Param("bookId") bookId: number,
    @Param("token") token: string
  ) {
    try {
      const destructToken: any = jwt.decode(token);
      const userFound = await this.userServices.findByEmail(
        destructToken.email
      );
      const id = await this.userServices.getIdFromUser(userFound);
      const user = await this.userServices.getUserById(id);
      const book = await this.bookServices.findBookByPk(bookId);
      const wish = this.wishFactoryService.createNewWish(wishDto);

      wish.book = [book];
      wish.user = user;
      await this.wishServices.createWish(wish);
      return "Adicionado aos favoritos";
    } catch (error) {
      return error.message;
    }
  }

  @Get("user/:token")
  async getWishes(@Param("token") token: string) {
    const destructToken: any = jwt.decode(token);
    const userFound = await this.userServices.findByEmail(destructToken.email);
    const id = await this.userServices.getIdFromUser(userFound) as string;

    return await this.wishServices.findWishes(id);
  }
}
