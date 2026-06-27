import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { Log } from './entities/log.entity';
import { Calen } from '../calen/entities/calen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), TypeOrmModule.forFeature([Calen])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule { }
