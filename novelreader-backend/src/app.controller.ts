import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get() // This will handle GET requests to '/'
  getHello(): string {
    return 'Server is up and running!';
  }
}
