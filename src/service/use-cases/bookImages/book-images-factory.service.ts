import { Injectable } from '@nestjs/common';
import { CreateBookImagesDto } from '../../../core/dtos';
import { BookImages } from 'src/core/entities/book-images.entity';

@Injectable()
export class BookImagesFactoryService {
    createNewBookImages(createBookImagesDto: CreateBookImagesDto) {
        const newBookImages = new BookImages();
        newBookImages.frontSideImage = createBookImagesDto.frontSideImage;
        newBookImages.leftSideImage = createBookImagesDto.leftSideImage;
        newBookImages.rightSideImage = createBookImagesDto.rightSideImage;
        newBookImages.backSideImage = createBookImagesDto.backSideImage;
        return newBookImages;
    }
}
