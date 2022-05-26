import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/core';
import { CreateWishListDto } from 'src/core/dtos/wish-list.dto';
import { WishList } from 'src/core/entities/wish-list.entity';

@Injectable()
export class WishFactoryService {
  createNewWish(createWish: CreateWishListDto) {
    const newWish = new WishList();
    newWish.book = createWish.book;
    newWish.wishLevel = createWish.wishLevel;
    newWish.user = createWish.user;
    return newWish;
  }
}
