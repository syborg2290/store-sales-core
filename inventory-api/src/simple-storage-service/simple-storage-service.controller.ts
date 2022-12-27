import { Controller, Post, Body, Request } from '@nestjs/common';
import { SimpleStorageServiceService } from './simple-storage-service.service';
import { CreateSignedUrlDto } from './dto/create-simple-storage-service.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthRequest } from 'src/common/interfaces/jwt-payload.interface';
import { GeneralResponse } from 'src/common/interfaces/general-response.interface';
import { HttpStatus } from '@nestjs/common/enums';

@UseGuards(JwtAuthGuard)
@Controller('signed-url')
export class SimpleStorageServiceController {
  constructor(
    private readonly simpleStorageServiceService: SimpleStorageServiceService,
  ) {}

  @Post('stock')
  async createSignedUrlForStock(
    @Body() data: CreateSignedUrlDto,
    @Request() request: AuthRequest,
  ): Promise<GeneralResponse> {
    const url =
      await this.simpleStorageServiceService.createPutSignedUrlForStock(
        data.fileName,
        data.stockId,
        request.user.salepointId,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Url created',
      data: {
        url,
      },
    };
  }
}
