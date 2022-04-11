import { Injectable } from '@nestjs/common';
import { Publisher } from '../../../core/entities';
import { IDataServices } from '../../../core/abstracts';
import { CreatePublisherDto } from '../../../core/dtos';
import { PublisherFactoryService } from './publisher-factory.service';

@Injectable()
export class PublisherServices {
  constructor(
    private dataServices: IDataServices,
    private publisherFactoryService: PublisherFactoryService,
  ) {}

  async createPublisher(
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    if (
      await this.dataServices.publisher.checkIfExists(createPublisherDto.name)
    ) {
      const publisher =
        this.publisherFactoryService.createNewPublisher(createPublisherDto);
      return this.dataServices.publisher.create(publisher);
    } else {
      return await this.dataServices.publisher.findOneByName(
        createPublisherDto.name,
      );
    }
  }

  async getAllPublishers() {
    return this.dataServices.publisher.findAll();
  }

  async getPublisherByName(name: string) {
    return this.dataServices.publisher.findOneByName(name);
  }
}
