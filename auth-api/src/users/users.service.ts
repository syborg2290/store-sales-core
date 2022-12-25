import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './dto/user.dto';
import User from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { BusinessesService } from 'src/businesses/businesses.service';
import { SalePointsService } from 'src/salepoints/salepoints.service';
import { CreateSalepointDto } from 'src/salepoints/dto/create-salepoint.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly businessesService: BusinessesService,
        private readonly SalePointService: SalePointsService,
    ) {}

    async findOne(email: string): Promise<User | undefined> {
        const userFound = await this.userModel.findOne({
            email,
            deletedAt: null,
        });
        return userFound;
    }
    async create(userData: RegisterUserDTO): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const { business, ...rest } = userData;
        const newBusiness = await this.businessesService.create(business);

        const newUser = await this.userModel.create({
            ...rest,
            businessId: newBusiness.id,
        });
        const salepointData: CreateSalepointDto = {
            name: 'Punto de venta principal',
            address: business.address,
            cellPhone: business.cellPhone,
        };
        await this.SalePointService.create(salepointData, newBusiness.id);

        return newUser;
    }

    public async findWithBusiness(userId: string): Promise<User> {
        const userFound = await this.userModel
            .findById(userId)
            .populate('businessId');

        return userFound;
    }
}
