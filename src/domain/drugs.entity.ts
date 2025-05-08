import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('drugs')
export class DrugEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}
