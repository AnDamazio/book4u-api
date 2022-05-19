import { PersonalDataController } from './controllers/personal-data.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { PersonalDataServices, UserServices } from './service';
import { DataServicesModule } from './service/data-services';
import { PersonalDataServicesModule } from './service/use-cases/personal-data/personal-data-service.module';
import { UserServicesModule } from './service/use-cases/user/user-services.module';
import { AuthModule } from './frameworks/auth/auth.module';
import { BookController } from './controllers/book.controller';
import { BookServices } from './service/use-cases/book/book-services.service';
import { BookServicesModule } from './service/use-cases/book/book-services.module';
import { AuthorServicesModule } from './service/use-cases/author';
import { LanguageServicesModule } from './service/use-cases/language';
import { PublisherServicesModule } from './service/use-cases/publisher/publisher-services.module';
import { CategoryServicesModule } from './service/use-cases/category';
import { UserSituationServicesModule } from './service/use-cases/userSituation';
import { BookImagesServicesModule } from './service/use-cases/bookImages';
import { TokenController } from './controllers/token.controller';

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
    AuthModule
  ],
  controllers: [AppController, UserController, BookController, TokenController, PersonalDataController],
  providers: [AppService, UserServices, BookServices, PersonalDataServices],
})
export class AppModule { }
