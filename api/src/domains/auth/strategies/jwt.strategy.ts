import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConfig } from '~configs/env.config';
import { UserEntity } from '~domains/users/entities/user.entity';
import { UserService } from '~domains/users/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: envConfig.JWT.SECRET,
    });
  }

  async validate(payload: {
    id: string;
    iat: number;
    exp: number;
  }): Promise<UserEntity> {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
