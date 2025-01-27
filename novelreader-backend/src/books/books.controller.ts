import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: './uploads',  // Directory for storing uploaded files
      filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;  // Unique file name
        cb(null, fileName);
      }
    }),
    limits: {
      fileSize: 50 * 1024 * 1024,  // Limit file size to 50MB
    },
  }))
  async addBook(
    @UploadedFile() file: Express.Multer.File,
    @Body() bookData: Book,
  ): Promise<Book> {
    if (file) {
      bookData.filePath = file.path;  // Store file path
      bookData.fileType = file.mimetype;  // Store file type (MIME type)
    }
    return this.booksService.create(bookData);  // Call the service to create the book
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookData: Book,
  ): Promise<Book> {
    return this.booksService.update(id, bookData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
