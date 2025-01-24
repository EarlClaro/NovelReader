import { Controller, Get, Post, Delete, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema'; // Import Book schema
import { Model } from 'mongoose';

@Controller('api/books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  @Get()
  async getBooks() {
    return this.booksService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('book'))
  async uploadBook(@UploadedFile() file: Express.Multer.File) {
    return this.booksService.create(file);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
