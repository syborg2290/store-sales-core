import mongoose, { Document, HydratedDocument, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { DateFormatService } from 'src/utils/services/date-format.service';
import Business from 'src/businesses/entity/business.entity';

export type UserDocument = HydratedDocument<User>;
@Schema()
export default class User extends Document {
    @Prop({
        unique: true,
        index: true,
    })
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop({
        default: null,
    })
    deletedAt: string;

    @Prop({
        default: DateFormatService.getFormattedDateForPersistenceEnvironment(),
    })
    createdAt: string;

    @Prop({
        default: DateFormatService.getFormattedDateForPersistenceEnvironment(),
    })
    updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
    transform: (document, user) => {
        user.id = user._id;
        user.business = user.businessId;
        delete user['_id'];
        delete user['__v'];
        delete user['password'];
        delete user['deletedAt'];
        delete user['businessId'];
        return user;
    },
});
