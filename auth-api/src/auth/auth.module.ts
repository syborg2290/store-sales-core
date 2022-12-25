import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    providers: [AuthService, JwtStrategy],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: process.env.SECRET_JWT,
                    expiresIn: process.env.EXPIRES_IN_JWT,
                };
            },
        }),
    ],
    controllers: [AuthController],
})
export class AuthModule {}
