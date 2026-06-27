import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LogService } from './log.service';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ReadLogDto } from './dto/read-log.dto';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) { }

  @Post()
  create(@Body() createLogDto: CreateLogDto): Promise<ReadLogDto> {
    return this.logService.create(createLogDto);
  }

  @Get()
  findAll(): Promise<ReadLogDto[]> {
    return this.logService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Log> {
    return this.logService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLogDto: UpdateLogDto,
  ): Promise<ReadLogDto> {
    return this.logService.update(id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.logService.remove(id);
  }

  @Post('reverse/:id')
  reverse(@Param('id', ParseUUIDPipe) id: string): Promise<ReadLogDto> {
    return this.logService.reverse(id);
  }
}
