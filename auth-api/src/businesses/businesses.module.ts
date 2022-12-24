import { Module } from '@nestjs/common';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';
import { MongooseModule } from '@nestjs/mongoose';
import Business, { BusinessSchema } from './entity/business.entity';
@Module({
    controllers: [BusinessesController],
    providers: [BusinessesService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Business.name,
                schema: BusinessSchema,
            },
        ]),
    ],
    exports:[BusinessesService]
})
export class BusinessesModule {}
