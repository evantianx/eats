import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext } from '../interfaces/gqlcontext.interface';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(
      ctx,
    ).getContext() as GqlContext;
    return gqlContext.me;
  },
);
