import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from '~configs/env.config';

@Injectable()
export class WsAuthGuard {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = context.switchToWs().getClient().handshake.query.token;

    if (!token) {
      throw new UnauthorizedException();
    }

    request.user = await this.jwtService.verifyAsync(token, {
      secret: envConfig.JWT.SECRET,
    });

    return true;
  }
}
