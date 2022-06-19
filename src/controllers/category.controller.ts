import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { IDataServices } from "src/core";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";
import { BookCategoriesServices } from "src/service";

@Controller("api/category")
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(
    private categoryServices: IDataServices,
    private bookCategories: BookCategoriesServices
  ) {}

  @Get("list-all")
  async listCategories() {
    return await this.categoryServices.category.findAll();
  }

  @Get("list-all/existent")
  async listExistentCategories() {
    return await this.bookCategories.findAll();
  }
}
