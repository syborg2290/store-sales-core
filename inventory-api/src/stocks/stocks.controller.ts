import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthRequest } from 'src/interfaces/jwt-payload.interface';
import { GeneralResponse } from 'src/common/interfaces/general-response.interface';

@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  async create(
    @Body() data: CreateStockDto,
    @Request() request: AuthRequest,
  ): Promise<GeneralResponse> {
    const { salepointId, businessId } = request.user;
    const stock = await this.stocksService.create(
      data,
      salepointId,
      businessId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Stock created',
      data: {
        stock,
      },
    };
  }

  @Get()
  async findAll(@Request() request: AuthRequest): Promise<GeneralResponse> {
    const { salepointId } = request.user;
    const stocks = await this.stocksService.findAll(salepointId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Stocks found',
      data: {
        stocks,
      },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
