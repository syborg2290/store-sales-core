import mongoose, { Document, HydratedDocument, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { DateFormatService } from 'src/utils/services/date-format.service';
import User from 'src/users/entity/user.entity';
import Salepoint from 'src/salepoints/entities/salepoint.entity';
export type BusinessDocument = HydratedDocument<Business>;
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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);

BusinessSchema.set('toJSON', {
    transform: (document, business) => {
        business.id = business._id;
        delete business['_id'];
        delete business['__v'];
        delete business['deletedAt'];
        return business;
    },
});
