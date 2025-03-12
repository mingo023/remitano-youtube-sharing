import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { envConfig } from '~configs/env.config';
import { UserEntity } from '~domains/users/entities/user.entity';
import { UserService } from '~domains/users/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signUp(email: string, password: string) {
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email has been taken');
    }

    const user = await this.userService.createUser(
      email,
      await this.hashPassword(password),
    );

    return this.createAuthResponse(user);
  }

  public async signIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Email or password is incorrect');
    }

    return this.createAuthResponse(user);
  }

  private async createAuthResponse(user: UserEntity) {
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      { expiresIn: envConfig.JWT.EXPIRES_IN },
    );

    delete user.password;
    return {
      user,
      accessToken,
    };
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
