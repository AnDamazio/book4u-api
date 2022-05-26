import { AuthModule } from './../../../frameworks/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { DataServicesModule } from '../../data-services/data-services.module';
import { PersonalDataFactoryService } from './personal-data-factory.service';
import { PersonalDataServices } from './personal-data-services.service';

@Module({
  imports: [DataServicesModule],
  providers: [PersonalDataFactoryService, PersonalDataServices],
  exports: [PersonalDataFactoryService, PersonalDataServices],
})
export class PersonalDataServicesModule { }
