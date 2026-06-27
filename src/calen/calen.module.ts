import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalenController } from './calen.controller';
import { CalenService } from './calen.service';
import { Calen } from './entities/calen.entity';
import { User } from '../user/entities/user.entity';
import { LogModule } from '../log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Calen, User]), LogModule],
  controllers: [CalenController],
  providers: [CalenService],
  exports: [CalenService],
})
export class CalenModule {}
