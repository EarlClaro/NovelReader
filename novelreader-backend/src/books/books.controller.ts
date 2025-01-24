import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedFileTypes = /pdf|epub/;
        const isValid = allowedFileTypes.test(extname(file.originalname).toLowerCase());
        if (isValid) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  async uploadBook(@UploadedFile() file: Express.Multer.File, @Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto, file.filename);
  }

  @Get()
  async getAllBooks() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }
}
