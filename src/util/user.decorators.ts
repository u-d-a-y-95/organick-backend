import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export class UserProp {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  isVerified: boolean;
}

export const User = createParamDecorator(
  (key: string, ctx: ExecutionContext): string | UserProp => {
    const req = ctx.switchToHttp().getRequest();
    const user = req['user'];
    return key ? user[key] : user;
  },
);
