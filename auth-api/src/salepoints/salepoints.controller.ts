import {
    Controller,
    Get,
    UseGuards,
    HttpStatus,
    Request,
    Patch,
    Param,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import JwtAuthPayload, {
    AuthRequest,
} from 'src/auth/interfaces/jwt-payload.interface';
import { GeneralResponse } from 'src/common/interfaces/general-response.interface';
import { SalePointsService } from './salepoints.service';

@Controller('salepoints')
export class SalepointsController {
    constructor(
        private readonly salepointsService: SalePointsService,
        private readonly jwtService: JwtService,
    ) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getSalepoints(
        @Request() request: AuthRequest,
    ): Promise<GeneralResponse> {
        const { businessId } = request.user;
        const salepointsFound = await this.salepointsService.findByBusinessId(
            businessId,
        );

        return {
            statusCode: HttpStatus.OK,
            message: 'Salepoints found',
            data: {
                salepoints: salepointsFound,
            },
        };
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:salepointId')
    public async setSalepoint(
        @Request() request: AuthRequest,
        @Param('salepointId') salepointId: string,
    ): Promise<GeneralResponse> {
        const { businessId, email, id } = request.user;
        const salepointFound = await this.salepointsService.findById(
            salepointId,
        );
        const payload: JwtAuthPayload = {
            id,
            email,
            salepointId,
            businessId,
        };
        const token = this.jwtService.sign(payload, {
            secret: process.env.SECRET_JWT,
            expiresIn: process.env.EXPIRES_IN_FINAL_TOKEN,
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Salepoint selected',
            data: {
                salepoint: salepointFound,
                accessToken: token,
                type: 'Bearer',
            },
        };
    }
}
