import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calen } from './entities/calen.entity';

@Injectable()
export class CalenService {
  constructor(
    @InjectRepository(Calen)
    private readonly calenRepository: Repository<Calen>,
  ) {}

  findAll(): Promise<Calen[]> {
    return this.calenRepository.find({
      order: { date: 'ASC' },
    });
  }
}
