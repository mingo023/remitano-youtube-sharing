import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module';
import { AuthController } from './controllers/http/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '~configs/env.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: envConfig.JWT.SECRET,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
