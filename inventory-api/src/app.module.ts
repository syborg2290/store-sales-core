import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config"
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret:process.env.SECRET_JWT
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.POSTGRES_HOST,
      password:process.env.POSTGRES_PASSWORD,
      username:process.env.POSTGRES_USERNAME,
      port:+process.env.POSTGRES_PORT,
      database:process.env.POSTGRES_DB,
      synchronize:true,
      autoLoadEntities:true
    })
  ],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
