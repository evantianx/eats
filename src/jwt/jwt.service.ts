import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './interfaces/jwtModuleOptions.interface';
import { JWTMODULEOPTIONS } from './jwt.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWTMODULEOPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: { id: number }): string {
    try {
      return jwt.sign(payload, this.options.secret, {
        expiresIn: this.options.expiresIn,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  verify(token: string) {
    try {
      return jwt.verify(token, this.options.secret);
    } catch (e) {
      throw new HttpException('Invalid token', 401);
    }
  }
}
