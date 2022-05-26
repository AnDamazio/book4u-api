import { Module } from '@nestjs/common';
import { UserSituationFactoryService } from './userSituation-factory.service';
import { DataServicesModule } from 'src/service/data-services';
import { UserSituationServices } from './userSituation-services.service';

@Module({
    imports: [DataServicesModule],
    providers: [UserSituationFactoryService, UserSituationServices],
    exports: [UserSituationFactoryService, UserSituationServices],
})
export class UserSituationServicesModule { }
