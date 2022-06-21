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

      const exists = (await this.wishServices.findWish(wish, id)) as any;

      if (exists) {
        await this.wishServices.removeWish(exists.id);
        return "Removido dos favoritos";
      } else {
        await this.wishServices.createWish(wish);
      }

      return "Adicionado aos favoritos";
    } catch (error) {
      return error.message;
    }
  }

  @Get("user/:token")
  async getWishes(@Param("token") token: string) {
    const destructToken: any = jwt.decode(token);
    const userFound = await this.userServices.findByEmail(destructToken.email);
    const id = (await this.userServices.getIdFromUser(userFound)) as string;

    return await this.wishServices.findWishes(id);
  }

  @Get("teste/:token/:bookId")
  async getWish(
    @Param("token") token: string,
    @Param("bookId") bookId: number,
    @Body() wishDto: CreateWishListDto
  ) {
    const destructToken: any = jwt.decode(token);
    const userFound = await this.userServices.findByEmail(destructToken.email);
    const book = await this.bookServices.findBookByPk(bookId);
    const id = (await this.userServices.getIdFromUser(userFound)) as string;
    const wish = this.wishFactoryService.createNewWish(wishDto);
    const user = await this.userServices.getUserById(id);

    wish.book = [book];
    wish.user = user;

    console.log(wish.book[0]);

    return await this.wishServices.findWish(wish, id);
  }
}
