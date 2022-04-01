import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserServices } from './service';
import { DataServicesModule } from './service/data-services';
import { PersonalDataServicesModule } from './service/use-cases/personal-data/personal-data-service.module';
import { UserServicesModule } from './service/use-cases/user/user-services.module';

@Module({
  imports: [DataServicesModule, UserServicesModule, PersonalDataServicesModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserServices],
})
export class AppModule {}
