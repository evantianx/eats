import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { EditUserInput, EditUserOutput } from './dtos/editUser.dto';
import { GetUserOutput } from './dtos/getUser.dto';
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
      console.log(error);
      return { ok: false, error: "Couldn't login user" };
    }
  }

  async findUserById(id: number): Promise<GetUserOutput> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        return { ok: false, error: 'User does not exist' };
      }
      return { ok: true, error: '', user };
    } catch (e) {
      return { ok: false, error: `Couldn\'t find user with id ${id}` };
    }
  }

  async editUser(
    id: number,
    { email, password }: EditUserInput,
  ): Promise<EditUserOutput> {
    // `this.userRepository.update(id, { email, password })` won't trigger
    // the update event, so we need to use `this.userRepository.save()`
    try {
      const user = await this.userRepository.findOne(id);
      if (email) user.email = email;
      if (password) user.password = password;
      await this.userRepository.save(user);
      return { ok: true, error: '' };
    } catch (e) {
      return { ok: false, error: `Couldn\'t edit user with id ${id}` };
    }
  }
}
