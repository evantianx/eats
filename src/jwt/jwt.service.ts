import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './interfaces/jwtModuleOptions.interface';
import { JWTMODULEOPTIONS } from './jwt.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWTMODULEOPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: { id: number }): string {
    return jwt.sign(payload, this.options.secret);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.secret);
  }
}
