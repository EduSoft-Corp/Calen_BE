import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('calen')
export class Calen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'boolean', default: true })
  visible: boolean;

  @Column({ type: 'int' })
  colFrom: number;

  @Column({ type: 'int' })
  colTo: number;

  @Column({ type: 'int' })
  rowFrom: number;

  @Column({ type: 'int' })
  rowTo: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime'})
  updatedAt: Date;
}
