import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity'; // Import TypeORM entity

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>, // Inject the repository for Book
  ) {}

  // Find all books
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  // Find a book by its ID
  async findById(id: string): Promise<Book | null> {
    return this.bookRepository.findOne(id); // Find by ID using the repository
  }

  // Create a new book
  async create(bookData: Book): Promise<Book> {
    const book = this.bookRepository.create(bookData); // Create a new book instance
    return this.bookRepository.save(book);  // Save the new book to the database
  }

  // Update an existing book
  async update(id: string, bookData: Book): Promise<Book> {
    const existingBook = await this.findById(id);
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }

    // Merge existing data with new data
    Object.assign(existingBook, bookData);
    return this.bookRepository.save(existingBook);  // Save the updated book to the database
  }

  // Delete a book by its ID
  async remove(id: string): Promise<void> {
    const existingBook = await this.findById(id);
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }

    await this.bookRepository.remove(existingBook);  // Remove the book from the database
  }
}
