import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto, UpdateStockImageDto } from './dto/update-stock.dto';
import { StockImage } from './entities/stock-image.entity';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    @InjectRepository(StockImage)
    private stockImageRepository: Repository<StockImage>,
  ) {}

  async create(
    data: CreateStockDto,
    salepointId: string,
    businessId: string,
  ): Promise<Stock> {
    const newStock = this.stockRepository.save({
      businessId,
      salepointId,
      ...data,
    });

    return newStock;
  }

  async findAll(salepointId: string): Promise<Stock[]> {
    const stocksFound = this.stockRepository.find({
      where: {
        salepointId,
        isActive: true,
      },
    });

    return stocksFound;
  }

  async findOne(id: string): Promise<Stock> {
    const stock = await this.stockRepository.findOneBy({
      id,
      isActive: true,
    });
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  async update(id: string, data: UpdateStockDto) {
    const exist = await this.stockRepository.exist({
      where: {
        id,
        isActive: true,
      },
    });
    if (!exist) throw new BadRequestException('Stock not found');
    await this.stockRepository.update(
      {
        id,
      },
      data,
    );
    return id;
  }

  async disable(id: string) {
    await this.stockRepository.update(
      {
        id,
      },
      {
        isActive: false,
      },
    );

    return id;
  }

  async updateStockImage(id: string, data: UpdateStockImageDto) {
    const exist = await this.stockImageRepository.exist({
      where: {
        id,
      },
    });
    if (!exist) throw new BadRequestException('Stock image not found');
    const { stockId, ...rest } = data;

    const stock = await this.findOne(stockId);
    await this.stockImageRepository.update(
      {
        id,
      },
      {
        ...rest,
        stock,
      },
    );

    return id;
  }
  async createEmptyStockImage(): Promise<StockImage> {
    return this.stockImageRepository.save({});
  }
}
