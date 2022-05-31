import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../data-services/data-services.module';
import {
  BookCategoriesFactoryService,
  BookCategoriesServices,
} from '../book-categories';

@Module({
  imports: [DataServicesModule],
  providers: [BookCategoriesFactoryService, BookCategoriesServices],
  exports: [BookCategoriesFactoryService, BookCategoriesServices],
})
export class BookCategoriesServicesModule {}
