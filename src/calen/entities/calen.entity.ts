import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('calen')
export class Calen {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  content!: string;

  @Column({ type: 'datetime' })
  date!: Date;

  @Column({ type: 'boolean', default: true })
  visible!: boolean;

  @Column({ type: 'int' })
  colFrom!: number;

  @Column({ type: 'int' })
  colTo!: number;

  @Column({ type: 'int' })
  rowFrom!: number;

  @Column({ type: 'int' })
  rowTo!: number;

  @Column({ type: 'boolean', default: false })
  isDelete!: boolean;

  @Column({ type: 'uuid' })
  createdByUserId!: string;

  @ManyToOne(() => User, (user) => user.calens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdByUserId' })
  creator!: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}
