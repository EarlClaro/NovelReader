import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // Get all books with optional filtering
  async findAll(filterBookDto: FilterBookDto = {}): Promise<Book[]> {
    return this.bookRepository.find({
      where: filterBookDto,  // Filters can be applied here
    });
  }

  // Find book by ID
  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });  // Find with 'where' clause
    if (!book) {
      throw new Error('Book not found');  // Handle the case where no book is found
    }
    return book;
  }

  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  // Update a book
  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.findById(id);  // Ensure the book exists
    await this.bookRepository.update(id, updateBookDto);
    return this.findById(id);  // Return the updated book
  }

  // Delete a book
  async remove(id: number): Promise<void> {
    const book = await this.findById(id);  // Ensure the book exists
    await this.bookRepository.remove(book);
  }
}
