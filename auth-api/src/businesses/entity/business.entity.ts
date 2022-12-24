import { Document, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import SalePoint from 'src/salepoints/entities/salepoint.entity';

@Schema()
export default class Business extends Document {
    @Prop({
        unique: true,
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
}

export const BusinessSchema = SchemaFactory.createForClass(Business);

BusinessSchema.set('toJSON', {
    transform:(document, business)=> {
        business.id = business._id
        delete business['_id']
        delete business['__v']
        delete business['deletedAt']
        return business
    }
})