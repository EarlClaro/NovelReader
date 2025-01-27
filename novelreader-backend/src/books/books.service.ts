import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // Create a new book
  async create(bookData: Book): Promise<Book> {
    const book = this.booksRepository.create(bookData);
    return await this.booksRepository.save(book);
  }

  // Get all books
  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  // Update an existing book by ID
  async update(id: string, bookData: Partial<Book>): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Update the book with the new data
    Object.assign(book, bookData);
    return this.booksRepository.save(book);
  }

  // Delete a book by ID
  async remove(id: string): Promise<void> {
    const book = await this.booksRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.booksRepository.delete(id);
  }
}
