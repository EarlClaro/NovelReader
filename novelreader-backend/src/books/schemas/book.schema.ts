import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Book Schema
@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  coverImage: string; // URL or path to the cover image

  @Prop()
  filePath: string; // Path to the uploaded book file (e.g., PDF, EPUB)
}

// Create the Mongoose schema
export const BookSchema = SchemaFactory.createForClass(Book);
