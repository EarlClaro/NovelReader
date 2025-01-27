// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entity/book.entity';  

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',           
      host: 'localhost',      
      port: 3306,              
      username: 'root',        
      password: 'password',    
      database: 'novelreader', 
      entities: [Book],        
      synchronize: true,       
    }),
    BooksModule,
  ],
})
export class AppModule {}
