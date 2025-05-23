import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class UsersModule {}
