import { Injectable } from '@nestjs/common';
import CreateBusinessDTO from './dto/create-business.dto';
import Business, { BusinessDocument } from './entity/business.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import User from 'src/users/entity/user.entity';
@Injectable()
export class BusinessesService {
    private businesses: Business[] = [];
    constructor(
        @InjectModel(Business.name)
        private readonly businessModel: Model<BusinessDocument>,
    ) {}

    public async findById(id: string): Promise<Business> {
        const businessFound: Business = await this.businessModel.findById(id);

        return businessFound;
    }
    public async findByUser(user: User): Promise<Business> {
        const businessFound: Business = await this.businessModel.findOne({
            user,
        });

        return businessFound;
    }

    public async create(
        businessData: CreateBusinessDTO,
        user: User,
    ): Promise<Business> {
        const newBusiness: Business = await this.businessModel.create({
            ...businessData,
            user,
        });

        return newBusiness;
    }
}
