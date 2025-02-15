import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers["authorization"].split(" ")[1];
  },
);
