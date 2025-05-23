import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DrugsController } from './infrastructure/controllers/drugs.controller';
import { DrugsModule } from './infrastructure/persistence/drugs.module';
import { DrugEntity } from './domain/drugs.entity';
import { DrugsService } from './application/drugs/services/drugs.service';
import { ScraperService } from './infrastructure/services/scraper.service';
import { IndicationsController } from './infrastructure/controllers/indications.controller';
import { Icd10Service } from './infrastructure/services/icd10.service';
import { IndicationsService } from './application/indications/services/indications.service';
import { IndicationsModule } from './infrastructure/persistence/indications.module';
import { DrugIndicationEntity } from './domain/indication.entity';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/auth/services/auth.service';
import { UsersService } from './application/users/services/users.service';
import { UserEntity } from './domain/user.entity';
import { UsersModule } from './infrastructure/persistence/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './application/auth/strategies/jwt.strategy';
import { UserController } from './infrastructure/controllers/user.controller';
import { ApiService } from './infrastructure/services/api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5433'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [DrugEntity, DrugIndicationEntity, UserEntity],
      synchronize: false, // Do not use in production
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    DrugsModule,
    IndicationsModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    DrugsController,
    IndicationsController,
    AuthController,
    UserController,
  ],
  providers: [
    AppService,
    DrugsService,
    IndicationsService,
    ScraperService,
    Icd10Service,
    AuthService,
    UsersService,
    JwtStrategy,
    ApiService,
  ],
})
export class AppModule {}
