import { Injectable } from '@nestjs/common';
import CreateBusinessDTO from './dto/create-business.dto';
import Business from './entity/business.entity';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class BusinessesService {
    private businesses: Business[] = [];
    constructor(
        @InjectModel(Business.name)
        private readonly businessModel: Model<Business>,
    ) {}

    public async findById(id: string): Promise<Business> {
        const businessFound: Business = await this.businessModel.findById(id);

        return businessFound;
    }

    public async create(businessData: CreateBusinessDTO, ): Promise<Business> {
        const newBusiness: Business = await this.businessModel.create(
            businessData,
        );

        return newBusiness;
    }
    
}

type UpdateBusiness =  { 
    name?:string,
    address?:string
    cellPhone?:string
    salepointsIds?:string[]
}