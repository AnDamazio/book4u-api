import { Injectable } from '@nestjs/common';
import { UserSituation } from '../../../core/entities/user-situation.entity';
import { IDataServices } from '../../../core/abstracts';
import { UserSituationDto } from '../../../core/dtos';
import { UserSituationFactoryService } from './userSituation-factory.service';
import { EnumUserSituation } from 'src/core';


@Injectable()
export class UserSituationServices {
    constructor(
        private dataServices: IDataServices,
        private userSituationFactoryService: UserSituationFactoryService,
    ) { }

    getAllUserSituation(): Promise<UserSituation[]> {
        return this.dataServices.userSituation.findAll();
    }

    async createUserSituation(userSituationDto: UserSituationDto): Promise<UserSituation> {
        if (await this.dataServices.userSituation.checkIfExist(userSituationDto.name)) {
            const userSituation = this.userSituationFactoryService.createnewUserSituation(userSituationDto);
            return this.dataServices.userSituation.create(userSituation);
        } else {
            return await this.dataServices.userSituation.findOneByName(userSituationDto.name)
        }
    }
}
