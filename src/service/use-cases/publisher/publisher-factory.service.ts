import { Injectable } from '@nestjs/common';
import { Publisher } from '../../../core/entities';
import { CreatePublisherDto } from '../../../core/dtos';
@Injectable()
export class PublisherFactoryService {
  createNewPublisher(createPublisherDto: CreatePublisherDto) {
    const newPublisher = new Publisher();
    newPublisher.name = createPublisherDto.name;

    return newPublisher;
  }
}
