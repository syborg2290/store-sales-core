import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './dto/user.dto';
import User, { UserDocument } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { BusinessesService } from 'src/businesses/businesses.service';
import { SalePointsService } from 'src/salepoints/salepoints.service';
import { CreateSalepointDto } from 'src/salepoints/dto/create-salepoint.dto';
import Business from 'src/businesses/entity/business.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
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

        const newUser = await this.userModel.create({
            ...rest,
        });
        const newBusiness = await this.businessesService.create(
            business,
            newUser,
        );
        const salepointData: CreateSalepointDto = {
            name: 'Punto de venta principal',
            address: business.address,
            cellPhone: business.cellPhone,
        };
        await this.SalePointService.create(salepointData, newBusiness);

        return newUser;
    }

    public async findOneWithBusiness(
        userId: string,
    ): Promise<findOneWithBusinessResponse> {
        const userFound = await this.userModel.findById(userId);
        const businessFound = await this.businessesService.findByUser(
            userFound,
        );
        return { user: userFound, business: businessFound };
    }
}

type findOneWithBusinessResponse = {
    user: User;
    business: Business;
};
