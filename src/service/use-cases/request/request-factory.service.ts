import { Request } from './../../../core/entities/request.entity';
import { Injectable } from '@nestjs/common';
import { RequestDto } from '../../../core/dtos';


@Injectable()
export class RequestFactoryService {
    createRequest(requestDto: RequestDto) {
        const newRequest = new Request();
        newRequest.situation = requestDto.situation;
        newRequest.book1 = requestDto.book1;
        newRequest.book2 = requestDto.book2;
        newRequest.createdAt = requestDto.createdAt;
        newRequest.readOwner1 = requestDto.readOwner1;
        newRequest.readOwner2 = requestDto.readOwner2;
    }
}
