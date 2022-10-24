import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload, JwtPayloadWithRefreshToken } from './../types';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { request } from 'http';




export const CurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)
        const req = ctx.getContext().req
        const user = req.user as JwtPayload
        return user.userId
    }
)