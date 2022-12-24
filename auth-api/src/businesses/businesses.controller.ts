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

@Controller('businesses')
export class BusinessesController {
    constructor(private readonly businessService: BusinessesService) {}

    @Get('/:id')
    public getBusiness(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    ): Object {
        const businessFound = this.businessService.findById(id);
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

    @HttpCode(HttpStatus.CREATED)
    @Post()
    public async createBusiness(
        @Body() businessData: CreateBusinessDTO,
    ): Promise<Object> {
        try {
            const newBusiness = await this.businessService.create(businessData);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Business created',
                data: {
                    business: newBusiness,
                },
            };
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException(
                    'Business name already exist',
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new InternalServerErrorException();
        }
    }
}
