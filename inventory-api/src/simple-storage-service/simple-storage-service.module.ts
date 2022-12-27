import { Module } from '@nestjs/common';
import { SimpleStorageServiceService } from './simple-storage-service.service';
import { SimpleStorageServiceController } from './simple-storage-service.controller';
import { StocksModule } from 'src/stocks/stocks.module';

@Module({
  controllers: [SimpleStorageServiceController],
  providers: [SimpleStorageServiceService],
  imports: [StocksModule],
})
export class SimpleStorageServiceModule {}
