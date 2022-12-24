import { Module } from '@nestjs/common';
import { SalePointsService } from './salepoints.service';
import { UtilsModule } from 'src/utils/utils.module';
import { MongooseModule } from '@nestjs/mongoose';
import SalePoint, { SalePointSchema } from './entities/salepoint.entity';
import { SalepointsController } from './salepoints.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [SalepointsController],
    providers: [SalePointsService],
    imports:[
        UtilsModule,
        JwtModule,
        MongooseModule.forFeature([
            {
                name: SalePoint.name,
                schema: SalePointSchema,
            },
        ]),
    ],
    exports:[
        SalePointsService
    ]
})
export class SalePointsModule {}
