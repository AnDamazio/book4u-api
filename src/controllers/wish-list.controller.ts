import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateWishListDto } from 'src/core/dtos/wish-list.dto';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt-auth.guard';
import { BookServices, UserServices } from 'src/service';
import {
  WishFactoryService,
  WishListServices,
} from 'src/service/use-cases/wish-list';

@Controller('api/wish-list')
@UseGuards(JwtAuthGuard)
export class WishListController {
  constructor(
    private wishServices: WishListServices,
    private wishFactoryService: WishFactoryService,
    private bookServices: BookServices,
    private userServices: UserServices,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:bookId/:userId')
  async createWish(
    @Body() wishDto: CreateWishListDto,
    @Param('bookId') bookId: number,
    @Param('userId') userId: number,
  ) {
    try {
      console.log(userId, bookId);
      const user = await this.userServices.getUserById(userId);
      const book = await this.bookServices.findBookByPk(bookId);
      const wish = this.wishFactoryService.createNewWish(wishDto);
      console.log(user, book);

      wish.book = [book];
      wish.user = user;
      const createdWish = await this.wishServices.createWish(wish);
      console.log(createdWish);
    } catch (error) {
      console.log(error);
    }
  }
}
