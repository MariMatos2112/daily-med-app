import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugIndicationEntity } from 'src/domain/indication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugIndicationEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class IndicationsModule {}
