import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import JwtAuthPayload from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_JWT,
      ignoreExpiration: false,
      usernameField: 'email',
    });
  }

  async validate(payload: JwtAuthPayload) {
    return {
      userId: payload.id,
      email: payload.email,
      salepointId: payload.salepointId,
      businessId: payload.businessId,
    };
  }
}
