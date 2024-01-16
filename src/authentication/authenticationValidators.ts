import * as jwt from 'jsonwebtoken';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TokenValidator extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "some-secret-key",
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

@Injectable()
export class AuthenticationMiddleware extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class UserRoleValidator extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const accessRole = this.reflector.get<string>('role', context.getHandler());
    if (!accessRole) {
      return true;
    }

    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const authHeader = request.headers.authorization;

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        sub: string;
        role: string;
        iat: number;
        exp: number;
      };
      const { role } = decoded;

      return role === accessRole;
    } catch (error) {
      return false;
    }
  }
}
