import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';

// Load environment variables
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost', 
      port: parseInt(process.env.DB_PORT || '3306', 10), 
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'novelreader',
      entities: [Book],
      synchronize: true,
    }),
    BooksModule,
    MulterModule.register({
      dest: './uploads',  // Folder to store the uploaded files
    }),
  ],
})
export class AppModule {}

