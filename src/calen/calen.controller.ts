import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CalenService } from './calen.service';
import { Calen } from './entities/calen.entity';
import { CreateCalenDto } from './dto/create-calen.dto';
import { UpdateCalenDto } from './dto/update-calen.dto';

@Controller('calen')
export class CalenController {
  constructor(private readonly calenService: CalenService) {}

  @Post()
  create(@Body() createCalenDto: CreateCalenDto): Promise<Calen> {
    return this.calenService.create(createCalenDto);
  }

  @Get()
  findAll(
    @Query('fromDay') fromDay?: string,
    @Query('toDay') toDay?: string,
  ): Promise<Calen[]> {
    return this.calenService.findAll({
      fromDay,
      toDay
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Calen> {
    return this.calenService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCalenDto: UpdateCalenDto,
  ): Promise<Calen> {
    return this.calenService.update(id, updateCalenDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Calen> {
    return this.calenService.remove(id);
  }
}
