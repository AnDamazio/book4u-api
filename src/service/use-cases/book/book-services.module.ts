import { Module } from '@nestjs/common';
import { BookFactoryService } from './book-factory.service';
import { DataServicesModule } from 'src/service/data-services';
import { BookServices } from './book-services.service';

@Module({
  imports: [DataServicesModule],
  providers: [BookFactoryService, BookServices],
  exports: [BookFactoryService, BookServices],
})
export class BookServicesModule {}
