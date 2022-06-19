import { Book } from './book.entity';
import { User } from './user.entity';

export class WishList {
  book: Book[];
  user: User;
}
