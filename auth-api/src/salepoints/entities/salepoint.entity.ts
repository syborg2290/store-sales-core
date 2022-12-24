import { Document, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import Business from '../../businesses/entity/business.entity';

@Schema()
export default class SalePoint extends Document {
    @Prop({
        index: true,
    })
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt:string;

    @Prop()
    deletedAt:string;

    
    @Prop({
        type:Types.ObjectId,
        ref:'Business'
    })
    businessId:string;
}

export const SalePointSchema = SchemaFactory.createForClass(SalePoint);

SalePointSchema.set('toJSON', {
    transform:(document, salePoint)=> {
        salePoint.id = salePoint._id
        delete salePoint['_id']
        delete salePoint['__v']
        delete salePoint['deletedAt']
        return salePoint
    }
})