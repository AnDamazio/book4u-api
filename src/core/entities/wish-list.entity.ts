import { Book } from './book.entity';
import { User } from './user.entity';

export class WishList {
  wishLevel: string;
  book: Book[];
  user: User;
}
