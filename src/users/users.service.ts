import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = this.userRepository.create({
      ...createUserDto,
      isActive: createUserDto.isActive ?? true,
    });

    const {id, email, fullName, isActive, lastLoggedIn, createdAt} = await this.userRepository.save(user);

    return {
      id, email, fullName, isActive, lastLoggedIn, createdAt
    } as ReadUserDto;
  }

  async findAll(): Promise<ReadUserDto[]> {
    const userList = await this.userRepository.find({
      where: { isDelete: false },
      order: { createdAt: 'DESC' },
    });

    return userList.map(({id, email, fullName, isActive, lastLoggedIn, createdAt}) => ({
      id, email, fullName, isActive, lastLoggedIn, createdAt
    } as ReadUserDto))
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(updateId: string, updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    const user = await this.findOne(updateId);

    this.userRepository.merge(user, updateUserDto);

    const {id, email, fullName, isActive, lastLoggedIn, createdAt} = await this.userRepository.save(user);

    return {
      id, email, fullName, isActive, lastLoggedIn, createdAt
    } as ReadUserDto;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);

    user.isDelete = true;

    const userDeleted = await this.userRepository.save(user);

    return true;
  }
}
