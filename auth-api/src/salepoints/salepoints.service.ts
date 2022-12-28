import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Business from 'src/businesses/entity/business.entity';
import { CreateSalepointDto } from './dto/create-salepoint.dto';
import Salepoint, { SalepointDocument } from './entities/salepoint.entity';

@Injectable()
export class SalePointsService {
    constructor(
        @InjectModel(Salepoint.name)
        private readonly salePointModel: Model<SalepointDocument>,
    ) {}
    public async findById(id: string): Promise<Salepoint> {
        return this.salePointModel.findById(id);
    }
    public async create(
        salePointData: CreateSalepointDto,
        business: Business,
    ): Promise<Salepoint> {
        const newSalePoint = await this.salePointModel.create({
            ...salePointData,
            business,
        });
        return newSalePoint;
    }

    public async findByBusinessId(businessId: string): Promise<Salepoint[]> {
        const salepoints = await this.salePointModel.find({
            businessId,
        });

        return salepoints;
    }
}
