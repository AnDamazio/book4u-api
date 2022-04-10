import { Module } from '@nestjs/common';
import { PublisherFactoryService } from './publisher-factory.service';
import { DataServicesModule } from 'src/service/data-services';
import { PublisherServices } from './publisher-services.service';
@Module({
  imports: [DataServicesModule],
  providers: [PublisherFactoryService, PublisherServices],
  exports: [PublisherFactoryService, PublisherServices],
})
export class PublisherServicesModule {}
