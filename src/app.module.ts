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
      entities: [DrugEntity, DrugIndicationEntity, UserEntity], // Load your entities
      synchronize: false, // Don't use this in production
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use an env variable or fallback to hardcoded value
      signOptions: { expiresIn: '1d' }, // Set token expiration time
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
  ],
})
export class AppModule {}
