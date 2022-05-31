import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { IDataServices } from "src/core";
import { JwtAuthGuard } from "src/frameworks/auth/jwt-auth.guard";

@Controller("api/category")
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private categoryServices: IDataServices) { }

  @Get("list-all")
  async listCategories() {
    return await this.categoryServices.category.findAll();
  }
}
