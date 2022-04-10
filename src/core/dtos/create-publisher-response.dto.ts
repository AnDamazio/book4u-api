import { Publisher } from '../entities';

export class CreatePublisherResponseDto {
  success: boolean;
  createdPublisher: Publisher;
}
