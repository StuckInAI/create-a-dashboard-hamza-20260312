import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('stats')
export class Stats {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  label!: string;

  @Column({ type: 'float' })
  value!: number;

  @Column({ type: 'float' })
  change!: number;

  @CreateDateColumn()
  recordedAt!: Date;
}
