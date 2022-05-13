import { Injectable } from '@nestjs/common';
import { BookImages } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateBookImagesDto } from '../../../core/dtos';
import { BookImagesFactoryService } from './book-images-factory.service';

@Injectable()
export class BookImagesServices {
    constructor(
        private bookImagesServices: IDataServices,
        private bookImagesFactoryService: BookImagesFactoryService,
    ) { }

    async getAllBookImages(): Promise<BookImages[]> {
        return await this.bookImagesServices.bookImages.findAll();
    }

    async createBookImages(createBookImagesDto: CreateBookImagesDto): Promise<BookImages> {
        const bookImages = this.bookImagesFactoryService.createNewBookImages(createBookImagesDto);
        return await this.bookImagesServices.bookImages.create(bookImages);
    }

    async updateBookImages(id: number, bookFound: any): Promise<any> {
        try {
            return await this.bookImagesServices.bookImages.updateBookImages(id, bookFound)
        } catch (err) {
            return err.message
        }
    }

    async getIdFromBookImages(bookImages: BookImages): Promise<BookImages> {
        try {
            return await this.bookImagesServices.bookImages.getIdFromBookImages(bookImages)
        } catch (err) {
            return err.message
        }
    }
}
