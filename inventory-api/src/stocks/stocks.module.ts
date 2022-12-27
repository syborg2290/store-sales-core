import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { StockImage } from './entities/stock-image.entity';
import { StocksService } from './stocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, StockImage])],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
