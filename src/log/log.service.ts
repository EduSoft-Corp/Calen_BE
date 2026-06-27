import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ReadLogDto } from './dto/read-log.dto';
import { Calen } from '../calen/entities/calen.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    @InjectRepository(Calen)
    private readonly calenRepository: Repository<Calen>,
  ) { }

  async create(createLogDto: CreateLogDto): Promise<ReadLogDto> {
    const log = this.logRepository.create(createLogDto);
    const savedLog = await this.logRepository.save(log);
    return this.mapToReadDto(savedLog);
  }

  async findAll(): Promise<ReadLogDto[]> {
    const logs = await this.logRepository.find({
      order: { createdAt: 'DESC' },
    });
    return logs.map((log) => this.mapToReadDto(log));
  }

  async findOne(id: string): Promise<Log> {
    const log = await this.logRepository.findOne({
      where: { id },
    });

    if (!log) {
      throw new NotFoundException(`Log with id ${id} not found`);
    }

    return log;
  }

  async update(id: string, updateLogDto: UpdateLogDto): Promise<ReadLogDto> {
    const log = await this.findOne(id);
    this.logRepository.merge(log, updateLogDto);
    const updatedLog = await this.logRepository.save(log);
    return this.mapToReadDto(updatedLog);
  }

  async remove(id: string): Promise<boolean> {
    const log = await this.findOne(id);
    await this.logRepository.remove(log);
    return true;
  }

  async reverse(id: string): Promise<ReadLogDto> {
    const log = await this.findOne(id);

    switch (log.action) {
      case 'CREATE':
        if (log.affectedEntity === "Calen") {
          await this.calenRepository.delete(log.entityId);
        }
        break;
      case 'UPDATE':

        break;
      case 'DELETE':

        break;
    }

    log.hasBeenReverse = true;
    const updatedLog = await this.logRepository.save(log);
    return this.mapToReadDto(updatedLog);
  }

  private mapToReadDto(log: Log): ReadLogDto {
    return {
      id: log.id,
      userId: log.userId,
      entityId: log.entityId,
      action: log.action,
      affectedEntity: log.affectedEntity,
      hasBeenReverse: log.hasBeenReverse,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    };
  }
}
