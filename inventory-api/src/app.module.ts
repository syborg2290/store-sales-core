import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { StocksModule } from './stocks/stocks.module';
import { DataSource } from 'typeorm';
import { Stock } from './stocks/entities/stock.entity';
import { S3Module } from 'nestjs-s3';
import { SimpleStorageServiceModule } from './simple-storage-service/simple-storage-service.module';
import { StockImage } from './stocks/entities/stock-image.entity';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USERNAME,
      port: +process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
      entities: [Stock, StockImage],
    }),
    StocksModule,
    S3Module,
    SimpleStorageServiceModule,
  ],
  controllers: [],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
