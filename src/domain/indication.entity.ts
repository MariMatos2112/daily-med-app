import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DrugEntity } from './drugs.entity';

@Entity('drug_indications')
export class DrugIndicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  drug_id: string;

  @Column({ length: 10 })
  icd_10_code: string;

  @Column({ length: 120 })
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => DrugEntity)
  @JoinColumn({ name: 'drug_id' })
  drug: DrugEntity;
}
