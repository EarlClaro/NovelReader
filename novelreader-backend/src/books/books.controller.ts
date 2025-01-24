import { Controller, Post, Get, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body('title') title: string) {
    return this.booksService.create(file, title);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
}
