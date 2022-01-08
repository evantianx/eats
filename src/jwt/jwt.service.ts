import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './interfaces/jwtModuleOptions.interface';
import { JWTMODULEOPTIONS } from './jwt.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWTMODULEOPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  async sign(payload: { id: number }): Promise<string> {
    return jwt.sign(payload, this.options.secret);
  }
}
