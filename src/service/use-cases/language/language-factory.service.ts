import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from '../../../core/dtos';
import { Language } from 'src/core/entities/language.entity';


@Injectable()
export class LanguageFactoryService {
  createNewLanguage(createLanguageDto: CreateLanguageDto) {
    const newLanguage = new Language();
    newLanguage.name = createLanguageDto.name;
    return newLanguage;
  }
}
