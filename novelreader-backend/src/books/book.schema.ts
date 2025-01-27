import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  summary: string;

  @Prop()
  dateAdded: Date;

  @Prop({ required: true })
  fileUrl: string; // Path to the uploaded file
}

export const BookSchema = SchemaFactory.createForClass(Book);
