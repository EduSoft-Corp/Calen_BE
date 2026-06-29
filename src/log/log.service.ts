import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ReadDetailLogDto, ReadLogDto } from './dto/read-log.dto';
import { Calen } from '../calen/entities/calen.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    @InjectRepository(Calen)
    private readonly calenRepository: Repository<Calen>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createLogDto: CreateLogDto): Promise<ReadLogDto> {
    const log = this.logRepository.create(createLogDto);
    const savedLog = await this.logRepository.save(log);
    return this.mapToReadDto(savedLog);
  }

  async findAll(): Promise<ReadDetailLogDto[]> {
    const logs = await this.logRepository.find({
      order: { createdAt: 'DESC' },
    });
    const detailedLogs = await Promise.all(logs.map((log) => this.mapToReadDto(log)));
    return detailedLogs;
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

  private async mapToReadDto(log: Log): Promise<ReadDetailLogDto> {
    let userName = '';
    // Get user name from calen entity
    const user = await this.userRepository.findOne({
      where: { id: log.userId },
    });
    if (user) {
      userName = user.fullName;
    }
    return {
      id: log.id,
      userId: log.userId,
      userName: userName,
      entityId: log.entityId,
      action: log.action,
      affectedEntity: log.affectedEntity,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    };
  }
}
