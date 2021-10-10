import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx).getContext();

    const token = context?.req?.headers?.authorization;

    if (token) {
      return token;
    }

    return null;
  },
);
