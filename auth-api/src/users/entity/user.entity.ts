import { Document, Types } from "mongoose";
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Exclude } from "class-transformer";
import Business from "../../businesses/entity/business.entity"
 
@Schema()
export default class User extends Document {
    @Prop({
        unique:true,
        index:true
    })
    email:string;

    @Prop()
    password:string;

    @Prop()
    name:string;

    @Prop({
        default:null
    })
    deletedAt:string;
    
    @Prop()
    createdAt: string;

    @Prop()
    updatedAt:string;

    
    @Prop({ type: Types.ObjectId, ref: 'Business' })
    businessId:string;
}

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.set('toJSON', {
    transform:(document, user)=> {
        user.id = user._id
        user.business = user.businessId
        delete user['_id']
        delete user['__v']
        delete user['password']
        delete user['deletedAt']
        delete user['businessId']
        return user
    }
})