import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/service/data-services';
import { WishFactoryService } from './wish-list-factory.service';
import { WishListServices } from './wish-list-services.service';

@Module({
  imports: [DataServicesModule],
  providers: [WishFactoryService, WishListServices],
  exports: [WishFactoryService, WishListServices],
})
export class WishListServicesModule {}
