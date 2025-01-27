import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.schema'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BooksController], // Register the controller
  providers: [BooksService], // Register the service
  exports: [BooksService], // Optionally, export the service if needed elsewhere
})
export class BooksModule {}
