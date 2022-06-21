import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core";
import { CreateWishListDto } from "src/core/dtos/wish-list.dto";
import { WishList } from "src/core/entities/wish-list.entity";
import { WishFactoryService } from "./wish-list-factory.service";

@Injectable()
export class WishListServices {
  constructor(
    private wishListServices: IDataServices,
    private wishFactoryService: WishFactoryService
  ) {}

  async createWish(createWishListDto: CreateWishListDto): Promise<WishList> {
    const wish = this.wishFactoryService.createNewWish(createWishListDto);
    return await this.wishListServices.wishList.create(wish);
  }

  async removeWish(id: string): Promise<any> {
    return await this.wishListServices.wishList.remove(id);
  }

  async findWishes(id: string): Promise<WishList[]> {
    return await this.wishListServices.wishList.findAll(id);
  }

  async findWish(wish, id): Promise<WishList> {
    return await this.wishListServices.wishList.findOne(wish, id);
  }
}
