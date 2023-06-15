import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadWithRefreshToken } from './../types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { request } from 'http';

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (data) {
      // console.log('data', req)
      return req.user[data];
    }

    return req.user;
  },
);
