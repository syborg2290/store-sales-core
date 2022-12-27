import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto, UpdateStockImageDto } from './dto/update-stock.dto';
import { Public } from 'src/common/guards/jwt-auth.guard';
import { AuthRequest } from 'src/common/interfaces/jwt-payload.interface';
import { GeneralResponse } from 'src/common/interfaces/general-response.interface';
import { ApikeyAuth } from 'src/common/guards/api-key-auth.guard';

@Controller('stocks')
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
  @Public()
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
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GeneralResponse> {
    const stock = await this.stocksService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Stock found',
      data: {
        stock,
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateStockDto,
  ): Promise<GeneralResponse> {
    await this.stocksService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Stock with id ' + id + ' updated',
      data: {
        id,
      },
    };
  }

  @Public()
  @UseGuards(ApikeyAuth)
  @Patch('/image/:id')
  async updateStockImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateStockImageDto,
  ): Promise<GeneralResponse> {
    await this.stocksService.updateStockImage(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Stock image with id ' + id + ' updated',
      data: {
        id,
      },
    };
  }

  @Patch(':id/disable')
  async disable(@Param('id', ParseUUIDPipe) id: string) {
    await this.stocksService.disable(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Stock with id ' + id + ' disabled',
      data: {
        id,
      },
    };
  }
}
