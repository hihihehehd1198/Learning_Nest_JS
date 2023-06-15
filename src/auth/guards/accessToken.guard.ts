import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
// import {} from '@nestjs'

@Injectable()
export class AccessTokenGuards extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx.getContext().req)
    return ctx.getContext().req;
  }
  canActivate(context: ExecutionContext) {
    // console.log('context : ',context)
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(context, isPublic);

    // console.log(isPublic)
    if (isPublic) {
      return true;
    }
    // const {user } = context.switchToHttp().getRequest()
    return super.canActivate(context);
  }
}
