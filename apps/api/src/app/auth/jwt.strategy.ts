import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

/** TokenData represents the data expected to be found when decoding JWT */
export interface TokenData {
  sub: string;
}

/** UserInfo represents the user data passed to the Request object */
export interface UserInfo {
  userID: string;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'veeva',
    });
  }

  /**
   * Retrieve user ID from JWT token data and pass it to the Request object. If
   * the token format doesn't match expected format, an error will be raised.
   * */
  async validate(payload: TokenData, done: Function) {
    if (!payload.sub) {
      return done(
        new UnauthorizedException({
          statusCode: 401,
          message: `Invalid body structure, expected key 'sub'`,
        }),
        false
      );
    }
    return done(undefined, { userID: payload.sub });
  }
}
