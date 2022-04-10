import { Injectable } from '@nestjs/common';
import { Language } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreateLanguageDto } from '../../../core/dtos';
import { LanguageFactoryService } from './language-factory.service';

@Injectable()
export class LanguageServices {
  constructor(
    private dataServices: IDataServices,
    private languageFactoryService: LanguageFactoryService,
  ) {}

  async getAllLanguages(): Promise<Language[]> {
    return await this.dataServices.language.findAll();
  }

  async createLanguage(createLanguageDto: CreateLanguageDto): Promise<Language> {
    if ( await this.dataServices.language.checkIfExists(createLanguageDto.name)) {
      const language = this.languageFactoryService.createNewLanguage(createLanguageDto);
      return this.dataServices.language.create(language);
    } 
    }
}
