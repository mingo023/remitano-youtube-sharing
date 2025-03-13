import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(email: string, password: string) {
    return this.userRepository.save({ email, password });
  }

  public async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
    });
  }
  public async findById(id: string) {
    return this.userRepository.findOneBy({
      id,
    });
  }
}
