import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DrugsController } from './infrastructure/controllers/drugs.controller';
import { DrugsModule } from './infrastructure/persistence/drugs/drugs.module';
import { DrugEntity } from './infrastructure/persistence/drugs/drugs.entity';
import { DrugsService } from './application/drugs/services/drugs.service';
import { ScraperService } from './infrastructure/services/scraper.service';
import { IndicationsController } from './infrastructure/controllers/indications.controller';
import { Icd10Service } from './infrastructure/services/icd10.service';
import { IndicationsService } from './application/indications/services/indications.service';
import { IndicationsModule } from './infrastructure/persistence/indications/indications.module';
import { DrugIndicationEntity } from './infrastructure/persistence/indications/indication.entity';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available app-wide
      envFilePath: '.env', // optional if using default `.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // or your DB type
      host: process.env.DATABASE_HOST, // your DB host
      port: parseInt(process.env.DATABASE_PORT || '5433'), // your DB port
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [DrugEntity, DrugIndicationEntity], // Load your entities
      synchronize: false, // Don't use this in production
    }),
    DrugsModule,
    IndicationsModule,
  ],
  controllers: [AppController, DrugsController, IndicationsController],
  providers: [
    AppService,
    DrugsService,
    IndicationsService,
    ScraperService,
    Icd10Service,
  ],
})
export class AppModule {}
