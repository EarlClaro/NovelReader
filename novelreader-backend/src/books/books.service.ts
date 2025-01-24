import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema'; // Import Book schema

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async create(file: Express.Multer.File): Promise<Book> {
    const newBook = new this.bookModel({
      title: file.originalname,
      coverImage: `/uploads/${file.filename}`,
      filePath: `/books/${file.filename}`, // Save the file path for future retrieval
    });
    return newBook.save();
  }

  async remove(id: string): Promise<any> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
