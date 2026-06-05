import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      email: createUserDto.email,
      fullName: createUserDto.fullName,
      password: hashedPassword,
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

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

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

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, isDelete: false },
    });
  }

  async updateLastLoggedInByEmail(email: string): Promise<void> {
    await this.userRepository.update({ email, isDelete: false }, {
      lastLoggedIn: new Date(),
    });
  }
}
