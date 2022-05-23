import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../data-services/data-services.module';
import { AutoRelationBooksFactoryService } from './autoRelationBooks-factory.service';
import { AutoRelationBooksServices } from './autoRelationBooks.service';

@Module({
    imports: [DataServicesModule],
    providers: [AutoRelationBooksFactoryService, AutoRelationBooksServices],
    exports: [AutoRelationBooksFactoryService, AutoRelationBooksServices],
})
export class AutoRelationBooksServicesModule { }
