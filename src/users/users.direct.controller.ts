import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users-direct')
export class UsersDirectController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllDirect(): string[] {
    return this.usersService.findAll();
  }
}
