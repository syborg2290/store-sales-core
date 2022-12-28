import mongoose, { Document, Types, HydratedDocument } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { DateFormatService } from 'src/utils/services/date-format.service';
import Business from 'src/businesses/entity/business.entity';

export type SalepointDocument = HydratedDocument<Salepoint>;
@Schema()
export default class Salepoint extends Document {
    @Prop({
        index: true,
    })
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop({
        default: DateFormatService.getFormattedDateForPersistenceEnvironment(),
    })
    createdAt: string;

    @Prop({
        default: DateFormatService.getFormattedDateForPersistenceEnvironment(),
    })
    updatedAt: string;

    @Prop()
    deletedAt: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Business' })
    business: Business;
}

export const SalePointSchema = SchemaFactory.createForClass(Salepoint);

SalePointSchema.set('toJSON', {
    transform: (document, salePoint) => {
        salePoint.id = salePoint._id;
        delete salePoint['_id'];
        delete salePoint['__v'];
        delete salePoint['deletedAt'];
        return salePoint;
    },
});
