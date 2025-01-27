import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books') // Name of the table in the database
export class Book {
  @PrimaryGeneratedColumn('uuid') // Automatically generate a unique UUID for each book
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  filePath?: string;  // File path for uploaded file

  @Column({ nullable: true })
  fileType?: string;  // MIME type of the uploaded file
}
