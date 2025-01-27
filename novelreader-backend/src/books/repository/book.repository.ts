import { EntityRepository, Repository } from 'typeorm';
import { Book } from '../entity/book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  // You can add custom queries here if needed in the future
}
