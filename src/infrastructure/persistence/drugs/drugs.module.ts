import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugEntity } from './drugs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DrugsModule {}
