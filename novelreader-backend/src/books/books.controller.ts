import { Controller, Post, Get, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Book } from './books.service';  // Correctly import the Book interface

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body('title') title: string): Book {
    return this.booksService.create(file, title);
  }

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }
}
