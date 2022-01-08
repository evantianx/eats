import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser({
    email,
    password,
    role,
  }: CreateUserInput): Promise<{ ok: boolean; error: string }> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (user) {
        return { ok: false, error: 'User already exists' };
      }
      await this.userRepository.save(
        this.userRepository.create({ email, password, role }),
      );
      return { ok: true, error: '' };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
