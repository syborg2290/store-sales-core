import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
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
      },
    });

    return stocksFound;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
