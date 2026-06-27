import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Calen } from './entities/calen.entity';
import { CreateCalenDto } from './dto/create-calen.dto';
import { UpdateCalenDto } from './dto/update-calen.dto';
import { User } from '../user/entities/user.entity';
import { LogService } from '../log/log.service';

@Injectable()
export class CalenService {
  constructor(
    @InjectRepository(Calen)
    private readonly calenRepository: Repository<Calen>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logService: LogService,
  ) {}

  async create(createCalenDto: CreateCalenDto): Promise<Calen> {
    await this.ensureUserExists(createCalenDto.createdByUserId);

    const calen = this.calenRepository.create({
      ...createCalenDto,
      visible: createCalenDto.visible ?? true,
    });

    const savedCalen = await this.calenRepository.save(calen);

    await this.logService.create({
      userId: savedCalen.createdByUserId,
      entityId: savedCalen.id,
      action: 'CREATE',
      affectedEntity: 'Calen',
    });

    return savedCalen;
  }

  findAll({fromDay, toDay}): Promise<Calen[]> {
    if(fromDay == undefined || toDay == undefined) return new Promise(()=>[]);
    
    return this.calenRepository.find({
      where: { isDelete: false, date: Between(fromDay, toDay) },
      order: { date: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Calen> {
    const calen = await this.calenRepository.findOne({
      where: { id, isDelete: false },
    });

    if (!calen) {
      throw new NotFoundException(`Calen with id ${id} not found`);
    }

    return calen;
  }

  async update(id: string, updateCalenDto: UpdateCalenDto): Promise<Calen> {
    const calen = await this.findOne(id);

    if (updateCalenDto.createdByUserId) {
      await this.ensureUserExists(updateCalenDto.createdByUserId);
    }

    this.calenRepository.merge(calen, updateCalenDto);

    const updatedCalen = await this.calenRepository.save(calen);

    await this.logService.create({
      userId: updateCalenDto.createdByUserId ?? updatedCalen.createdByUserId,
      entityId: updatedCalen.id,
      action: 'UPDATE',
      affectedEntity: 'Calen',
    });

    return updatedCalen;
  }

  async remove(id: string): Promise<Calen> {
    const calen = await this.findOne(id);

    calen.isDelete = true;

    const deletedCalen = await this.calenRepository.save(calen);

    await this.logService.create({
      userId: deletedCalen.createdByUserId,
      entityId: deletedCalen.id,
      action: 'DELETE',
      affectedEntity: 'Calen',
    });

    return deletedCalen;
  }

  private async ensureUserExists(userId: string): Promise<void> {
    const userExists = await this.userRepository.exist({
      where: { id: userId, isDelete: false },
    });

    if (!userExists) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }
}
