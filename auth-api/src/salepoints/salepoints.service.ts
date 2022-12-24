import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateFormatService } from 'src/utils/services/date-format.service';
import { CreateSalepointDto } from './dto/create-salepoint.dto';
import SalePoint from './entities/salepoint.entity';

@Injectable()
export class SalePointsService {
    constructor(
        private readonly dateFormatService: DateFormatService,
        @InjectModel(SalePoint.name)
        private readonly salePointModel: Model<SalePoint>,
    ) {}
    public async findById(id:string):Promise<SalePoint> {
        return this.salePointModel.findById(id)
    }
    public async create(salePointData:CreateSalepointDto, businessId:string):Promise<SalePoint> {
        const currentDate = this.dateFormatService.getFormatDateForPersistenceEnvironment()
        const newSalePoint = await this.salePointModel.create({
            ...salePointData,
            createdAt:currentDate,
            updatedAt:currentDate,
            businessId
        });
        return newSalePoint;
    }

    public async findByBusinessId(businessId:string): Promise<SalePoint[]> {
        const salepoints = await this.salePointModel.find({
            businessId
        });

        return salepoints;
    }
}
