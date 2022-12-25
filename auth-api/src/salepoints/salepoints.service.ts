import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSalepointDto } from './dto/create-salepoint.dto';
import SalePoint from './entities/salepoint.entity';

@Injectable()
export class SalePointsService {
    constructor(
        @InjectModel(SalePoint.name)
        private readonly salePointModel: Model<SalePoint>,
    ) {}
    public async findById(id: string): Promise<SalePoint> {
        return this.salePointModel.findById(id);
    }
    public async create(
        salePointData: CreateSalepointDto,
        businessId: string,
    ): Promise<SalePoint> {
        const newSalePoint = await this.salePointModel.create({
            ...salePointData,
            businessId,
        });
        return newSalePoint;
    }

    public async findByBusinessId(businessId: string): Promise<SalePoint[]> {
        const salepoints = await this.salePointModel.find({
            businessId,
        });

        return salepoints;
    }
}
