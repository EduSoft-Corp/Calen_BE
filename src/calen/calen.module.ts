import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalenController } from './calen.controller';
import { CalenService } from './calen.service';
import { Calen } from './entities/calen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calen])],
  controllers: [CalenController],
  providers: [CalenService],
  exports: [CalenService],
})
export class CalenModule {}
