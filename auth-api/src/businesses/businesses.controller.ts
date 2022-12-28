import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Post,
    UsePipes,
    ValidationPipe,
    InternalServerErrorException,
} from '@nestjs/common';
import CreateBusinessDTO from './dto/create-business.dto';

import { BusinessesService } from './businesses.service';
import { GeneralResponse } from 'src/common/interfaces/general-response.interface';

@Controller('businesses')
export class BusinessesController {
    constructor(private readonly businessService: BusinessesService) {}

    @Get('/:id')
    public async getBusiness(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    ): Promise<GeneralResponse> {
        const businessFound = await this.businessService.findById(id);
        if (!businessFound)
            throw new HttpException(
                `Business with id ${id} not found`,
                HttpStatus.NOT_FOUND,
            );

        return {
            statusCode: HttpStatus.OK,
            message: 'Business found',
            data: {
                business: businessFound,
            },
        };
    }
}
