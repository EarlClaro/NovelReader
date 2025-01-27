import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';  
import { BooksModule } from './books/books.module'; 

// Load environment variables from .env file
dotenv.config();

@Module({
  imports: [
  // Serve static files from the 'uploads' folder
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads', // This will serve the files under http://localhost:3001/uploads
  }),
  // MongoDB connection
    MongooseModule.forRoot(process.env.MONGO_URI || '', {}),
  // Import the BooksModule
    BooksModule,
  ],
  controllers: [AppController],  // Register AppController here
  providers: [],
})
export class AppModule {}
