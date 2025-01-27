import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Body() filterBookDto: FilterBookDto = {}): Promise<Book[]> {
    return this.booksService.findAll(filterBookDto);  // Pass the filter or empty object
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(Number(id));  // Convert id to number
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto
  ): Promise<Book> {
    return this.booksService.update(Number(id), updateBookDto);  // Convert id to number
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(Number(id));  // Convert id to number
  }
}
