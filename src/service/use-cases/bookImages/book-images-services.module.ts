import { Module } from '@nestjs/common';
import { BookImagesFactoryService } from './book-images-factory.service';
import { DataServicesModule } from 'src/service/data-services';
import { BookImagesServices } from './book-images-services.service';

@Module({
    imports: [DataServicesModule],
    providers: [BookImagesFactoryService, BookImagesServices],
    exports: [BookImagesFactoryService, BookImagesServices],
})
export class BookImagesServicesModule { }
