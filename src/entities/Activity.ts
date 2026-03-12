import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 500 })
  description!: string;

  @Column({ type: 'varchar', length: 50 })
  type!: string;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ type: 'int', nullable: true })
  userId!: number;
}
