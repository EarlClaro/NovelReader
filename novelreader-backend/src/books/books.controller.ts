import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity'; 
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.booksService.findAll(); // Fetch all books
  }

  @Post()
  async addBook(@Body() bookData: Book): Promise<Book> {
    // Generate a unique ID for the new book if not provided
    bookData.id = uuidv4();
    return this.booksService.create(bookData); // Call the service to create the book
  }

  @Put(':id/file')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: './uploads',  // Directory to store uploaded files
      filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;  // Unique file name
        cb(null, fileName);
      }
    }),
    limits: {
      fileSize: 50 * 1024 * 1024,  // Limit file size to 50MB
    },
  }))
  async addFileToBook(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Book> {
    const updatedBook = await this.booksService.findById(id); // Fetch the book by its ID
    if (!updatedBook) {
      throw new Error('Book not found');
    }

    if (file) {
      updatedBook.filePath = file.path;  // Save the file path
      updatedBook.fileType = file.mimetype;  // Save the file type
      return this.booksService.update(id, updatedBook);  // Update the book with file data
    }

    return updatedBook; // If no file is uploaded, return the book data without changes
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookData: Book
  ): Promise<Book> {
    return this.booksService.update(id, bookData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
