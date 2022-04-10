import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../data-services/data-services.module';
import { LanguageFactoryService } from './language-factory.service';
import { LanguageServices } from './language-services.service';

@Module({
  imports: [DataServicesModule],
  providers: [LanguageFactoryService, LanguageServices],
  exports: [LanguageFactoryService, LanguageServices],
})
export class LanguageServicesModule {}
