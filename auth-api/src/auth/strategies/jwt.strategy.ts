import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import JwtAuthPayload from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        console.log("XD",process.env.SECRET_JWT)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_JWT,
            usernameField: 'email',
        });
    }

    async validate(payload: JwtAuthPayload):Promise<JwtAuthPayload> {
        return { id: payload.id, email: payload.email, businessId: payload.businessId, salepointId:payload.salepointId};
    }
}
