import { Controller, Get } from '@nestjs/common';
import { CalenService } from './calen.service';
import { Calen } from './entities/calen.entity';

@Controller('calen')
export class CalenController {
  constructor(private readonly calenService: CalenService) {}

  @Get()
  findAll(): Promise<Calen[]> {
    return this.calenService.findAll();
  }
}
