import { Document, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import Business from '../../businesses/entity/business.entity';
import { DateFormatService } from 'src/utils/services/date-format.service';

@Schema()
export default class SalePoint extends Document {
    @Prop({
        index: true,
    })
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop({
        default: DateFormatService.getFormatDateForPersistenceEnvironment(),
    })
    createdAt: string;

    @Prop({
        default: DateFormatService.getFormatDateForPersistenceEnvironment(),
    })
    updatedAt: string;

    @Prop()
    deletedAt: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'Business',
    })
    businessId: string;
}

export const SalePointSchema = SchemaFactory.createForClass(SalePoint);

SalePointSchema.set('toJSON', {
    transform: (document, salePoint) => {
        salePoint.id = salePoint._id;
        delete salePoint['_id'];
        delete salePoint['__v'];
        delete salePoint['deletedAt'];
        return salePoint;
    },
});
