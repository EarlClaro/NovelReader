import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto, filename: string): Promise<Book> {
    const newBook = new this.bookModel({ ...createBookDto, filename }); 
    return newBook.save();
  }
  

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return book;
  }  

  async remove(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
  }
}
