import { Injectable } from '@nestjs/common';
import * as path from 'path';

export interface Book {  // Make sure to export the Book interface
  title: string;
  filePath: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [];

  create(file: Express.Multer.File, title: string): Book {
    const book: Book = {
      title: title,
      filePath: path.join('uploads', file.filename),
    };
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }
}
