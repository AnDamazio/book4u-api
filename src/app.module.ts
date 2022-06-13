import { PersonalDataController } from "./controllers/personal-data.controller";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./controllers/user.controller";
import {
  BookCategoriesServices,
  PersonalDataServices,
  UserServices,
} from "./service";
import { BookCategoriesServicesModule } from "./service/use-cases/book-categories/book-categories-services.module";
import { DataServicesModule } from "./service/data-services";
import { PersonalDataServicesModule } from "./service/use-cases/personal-data/personal-data-service.module";
import { UserServicesModule } from "./service/use-cases/user/user-services.module";
import { AuthModule } from "./frameworks/auth/auth.module";
import { BookController } from "./controllers/book.controller";
import { BookServices } from "./service/use-cases/book/book-services.service";
import { BookServicesModule } from "./service/use-cases/book/book-services.module";
import { AuthorServicesModule } from "./service/use-cases/author";
import { LanguageServicesModule } from "./service/use-cases/language";
import { PublisherServicesModule } from "./service/use-cases/publisher/publisher-services.module";
import {
  CategoryServices,
  CategoryServicesModule,
} from "./service/use-cases/category";
import { UserSituationServicesModule } from "./service/use-cases/userSituation";
import { BookImagesServicesModule } from "./service/use-cases/bookImages";
import { TokenController } from "./controllers/token.controller";
import { WishListServices } from "./service/use-cases/wish-list";
import { WishListController } from "./controllers/wish-list.controller";
import { WishListServicesModule } from "./service/use-cases/wish-list/wish-list-services.module";
import { CategoryController } from "./controllers/category.controller";
import {
  RequestServices,
  RequestServicesModule,
} from "./service/use-cases/request";
import {
  ExchangeWithCreditServices,
  ExchangeWithCreditServicesModule,
} from "./service/use-cases/exchange-with-credit";
import { ExchangeController } from "./controllers/exchange.controller";
import {
  ExchangeHistoryServices,
  ExchangeHistoryServicesModule,
} from "./service/use-cases/exchange-history";
import { HistoryController } from "./controllers/history.controller";

@Module({
  imports: [
    DataServicesModule,
    UserServicesModule,
    PersonalDataServicesModule,
    AuthorServicesModule,
    BookServicesModule,
    PublisherServicesModule,
    LanguageServicesModule,
    CategoryServicesModule,
    UserSituationServicesModule,
    BookImagesServicesModule,
    WishListServicesModule,
    AuthModule,
    RequestServicesModule,
    BookCategoriesServicesModule,
    CategoryServicesModule,
    ExchangeWithCreditServicesModule,
    ExchangeHistoryServicesModule,
  ],
  controllers: [
    AppController,
    UserController,
    BookController,
    TokenController,
    PersonalDataController,
    WishListController,
    CategoryController,
    ExchangeController,
    HistoryController
  ],
  providers: [
    AppService,
    UserServices,
    BookServices,
    PersonalDataServices,
    WishListServices,
    AuthModule,
    BookServices,
    RequestServices,
    BookCategoriesServices,
    CategoryServices,
    ExchangeWithCreditServices,
    ExchangeHistoryServices,
  ],
})
export class AppModule {}
