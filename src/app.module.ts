import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugsController } from './infrastructure/controllers/drugs.controller';
import { DrugsModule } from './infrastructure/persistence/drugs/drugs.module';
import { DrugEntity } from './infrastructure/persistence/drugs/drugs.entity';
import { DrugsService } from './application/drugs/services/drugs.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your DB type
      host: 'localhost', // your DB host
      port: 5433, // your DB port
      username: 'daily_med_user',
      password: 'password123',
      database: 'daily_med_db',
      entities: [DrugEntity], // Load your entities
      synchronize: false, // Don't use this in production
    }),
    DrugsModule,
  ],
  controllers: [AppController, DrugsController],
  providers: [AppService, DrugsService],
})
export class AppModule {}
