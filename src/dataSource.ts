import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DrugEntity } from 'src/domain/drugs.entity';
import { DrugIndicationEntity } from 'src/domain/indication.entity';
import { UserEntity } from 'src/domain/user.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [DrugEntity, DrugIndicationEntity, UserEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
