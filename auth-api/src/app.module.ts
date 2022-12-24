import { Module } from '@nestjs/common';
import { BusinessesModule } from './businesses/businesses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
@Module({
    imports: [
        BusinessesModule,
        ConfigModule.forRoot({
            isGlobal:true
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        UtilsModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
