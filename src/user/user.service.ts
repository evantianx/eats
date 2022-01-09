import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { LoginUserInput, LoginUserOutput } from './dtos/loginUser.dto';
import { RegisterUserInput, RegisterUserOutput } from './dtos/registerUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser({
    email,
    password,
    role,
  }: RegisterUserInput): Promise<RegisterUserOutput> {
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
      return { ok: false, error: "Couldn't register user" };
    }
  }

  async loginUser({
    email,
    password,
  }: LoginUserInput): Promise<LoginUserOutput> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        return { ok: false, error: 'User does not exist' };
      }
      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return { ok: false, error: 'Password is incorrect' };
      }
      const token = await this.jwtService.sign({ id: user.id });
      return { ok: true, error: '', token };
    } catch (error) {
      return { ok: false, error: "Couldn't login user" };
    }
  }

  findUserById(id: number): Promise<User> {
    try {
      return this.userRepository.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
