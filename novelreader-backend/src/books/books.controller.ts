import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { Book } from './book.schema';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['application/pdf', 'application/epub+zip'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
        }
      },
    }),
  )
  async addBook(@Body() bookData: { title: string; author: string; summary?: string }, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File upload is required', HttpStatus.BAD_REQUEST);
    }

    const newBook = {
      ...bookData,
      fileUrl: `/uploads/${file.filename}`, // File URL will be accessible through /uploads/{filename}
      dateAdded: new Date(),
    };

    return this.booksService.create(newBook); // Make sure you handle the save process in BooksService
  }
}
