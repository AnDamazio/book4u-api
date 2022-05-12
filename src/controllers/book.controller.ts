import {
  AuthorServices,
  AuthorFactoryService,
} from '../service/use-cases/author/';
import { BookServices, BookFactoryService } from '../service/use-cases/book/';
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseInterceptors,
  Param,
  UploadedFiles,
} from '@nestjs/common';
import {
  PublisherFactoryService,
  PublisherServices,
} from 'src/service/use-cases/publisher';
import { CreateBookDto, CreateBookResponseDto } from '../core/dtos';
import {
  LanguageFactoryService,
  LanguageServices,
} from 'src/service/use-cases/language';
import {
  CategoryFactoryService,
  CategoryServices,
} from 'src/service/use-cases/category';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import { BookImagesServices } from 'src/service/use-cases/bookImages';

@Controller('api/book')
export class BookController {
  constructor(
    private bookServices: BookServices,
    private bookFactoryService: BookFactoryService,
    private authorServices: AuthorServices,
    private authorFactoryService: AuthorFactoryService,
    private languageFactoryService: LanguageFactoryService,
    private languageServices: LanguageServices,
    private publisherFactoryService: PublisherFactoryService,
    private publisherServices: PublisherServices,
    private categoryFactoryService: CategoryFactoryService,
    private categoryServices: CategoryServices,
    private bookImagesServices: BookImagesServices,
  ) {}

  @Post()
  async createBook(@Body() bookDto: CreateBookDto) {
    const createBookResponse = new CreateBookResponseDto();
    try {
      const author = this.authorFactoryService.createNewAuthor(bookDto.author);
      const createdAuthor = await this.authorServices.createAuthor(author);
      bookDto.author = createdAuthor;

      const language = this.languageFactoryService.createNewLanguage(
        bookDto.language,
      );
      const createdLanguage = await this.languageServices.createLanguage(
        language,
      );
      bookDto.language = createdLanguage;

      const publisher = this.publisherFactoryService.createNewPublisher(
        bookDto.publisher,
      );
      const createdPublisher = await this.publisherServices.createPublisher(
        publisher,
      );
      bookDto.publisher = createdPublisher;

      const category = await this.categoryServices.getCategory(
        bookDto.category,
      );
      bookDto.category = category;

      const book = this.bookFactoryService.createNewBook(bookDto);
      const createdBook = await this.bookServices.createBook(book);

      createBookResponse.success = true;
      createBookResponse.createdBook = createdBook;
    } catch (err) {
      console.log(err);
      createBookResponse.success = false;
      return err;
    }
    return createBookResponse;
  }

  @Get('list')
  async userList() {
    const books = await this.bookServices.getAllBooks();
    return books;
  }

  @Put('sendBookImage/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async updateBookImage(
    @Param('id') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const bookFound = await this.bookServices.findBookByPk(id);
      const idFromBookImage = await this.bookImagesServices.getIdFromBookImages(
        bookFound.bookImages,
      );
      const [file0, file1, file2, file3] = files;
      bookFound.bookImages.frontSideImage =
        Date.now() + '_' + file0.originalname;
      bookFound.bookImages.rightSideImage =
        Date.now() + '_' + file1.originalname;
      bookFound.bookImages.leftSideImage =
        Date.now() + '_' + file2.originalname;
      bookFound.bookImages.backSideImage =
        Date.now() + '_' + file3.originalname;

      const fileName = [
        bookFound.bookImages.frontSideImage,
        bookFound.bookImages.rightSideImage,
        bookFound.bookImages.leftSideImage,
        bookFound.bookImages.backSideImage,
      ];

      fileName.forEach((fileName, position) => {
        const fileRef = ref(storage, fileName);
        uploadBytes(fileRef, files[position].buffer)
          .then()
          .catch((error) => {
            return error;
          });
      });
      await this.bookImagesServices.updateBookImages(
        Number(idFromBookImage),
        bookFound.bookImages,
      );
      return `Imagens inseridas com sucesso!`;
    } catch (err) {
      return err.message;
    }
  }
}
