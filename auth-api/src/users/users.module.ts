import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import User, { UserSchema } from './entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { BusinessesModule } from 'src/businesses/businesses.module';
import { SalePointsModule } from 'src/salepoints/salepoints.module';

@Module({
    providers: [UsersService],
    imports: [
        BusinessesModule,
        SalePointsModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
