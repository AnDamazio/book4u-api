import { Injectable } from '@nestjs/common';
import { UserSituation } from '../../../core/entities';
import { UserSituationDto } from '../../../core/dtos';

@Injectable()
export class UserSituationFactoryService {
    createnewUserSituation(userSituationDto: UserSituationDto) {
        const newUserSituation = new UserSituation();
        newUserSituation.name = userSituationDto.name;
        return newUserSituation;
    }
}
