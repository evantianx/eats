import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next();
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return next();
    }
    const payload = this.jwtService.verify(token) as Record<string, unknown>;
    if (payload?.id) {
      const { ok, error, user } = await this.userService.findUserById(
        payload.id as number,
      );
      if (ok && user) req['me'] = user;
      if (error) return next(new NotFoundException());
    }
    return next();
  }
}
