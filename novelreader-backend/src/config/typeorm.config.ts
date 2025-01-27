import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../books/entity/book.entity'; // Correctly import the Book entity

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',  // Correct type for MySQL
  host: 'localhost',
  port: 3306,
  username: 'root',  // Your MySQL username
  password: 'password',  // Your MySQL password
  database: 'novelreader',
  entities: [Book],  // Pass the Book entity directly here
  synchronize: true,  // Set to true only in development (automatically syncs entities with DB)
};
