import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalenController } from './calen.controller';
import { CalenService } from './calen.service';
import { Calen } from './entities/calen.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calen, User])],
  controllers: [CalenController],
  providers: [CalenService],
  exports: [CalenService],
})
export class CalenModule {}
