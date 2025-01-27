import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller'; // Import controller
import { BooksService } from './books.service';
import { Book, BookSchema } from './book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BooksController],  // Ensure controller is added here
  providers: [BooksService],
})
export class BooksModule {}
