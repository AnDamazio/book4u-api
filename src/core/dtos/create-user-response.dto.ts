import { User } from '../entities';

export class CreateUserResponseDto {
  success: boolean;
  createdUser: User;
}
