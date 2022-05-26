import { Module } from '@nestjs/common';
import { CategoryFactoryService } from './category-factory.service';
import { DataServicesModule } from 'src/service/data-services';
import { CategoryServices } from './category.services.service';

@Module({
  imports: [DataServicesModule],
  providers: [CategoryFactoryService, CategoryServices],
  exports: [CategoryFactoryService, CategoryServices],
})
export class CategoryServicesModule {}
