import { Inject, Provide, Config, Logger } from "@midwayjs/decorator";
import { IMiddleware, ILogger } from "@midwayjs/core";
import {
  Context as WebContext,
  NextFunction as WebNextFunction,
} from "@midwayjs/web";
import { JwtService } from "@midwayjs/jwt";
import { isEmpty } from "lodash";
import { Context } from "egg";
import {
  ADMIN_PREFIX_URL,
  NOAUTH_PREFIX_URL,
  Resp,
  RespOp,
} from "../controller/base";
import { Token } from "../interface";

@Provide()
export class AdminAuthMiddleware
  implements IMiddleware<WebContext, WebNextFunction>
{
  @Inject()
  jwtService: JwtService;

  @Config("authMiddleware.whitelist")
  whitelist: string[];

  @Logger()
  logger: ILogger;

  //app?: IMidwayBaseApplication<WebContext>
  resolve() {
    return async (ctx: WebContext, next: WebNextFunction) => {
      const url = ctx.url;
      this.logger.debug("AdminAuthMiddleware url ", url);
      let shouldIgnore = false;
      if (url.startsWith(`${ADMIN_PREFIX_URL}${NOAUTH_PREFIX_URL}`)) {
        shouldIgnore = true;
      } else if ((this.whitelist || []).includes(url)) {
        shouldIgnore = true;
      }
      if (shouldIgnore) {
        this.logger.debug("AdminAuthMiddleware ignore auth url : ", url);
        await next();
        return;
      }

      // const path = url.split("?")[0];
      const token = ctx.get("Authorization");
      this.logger.debug("AdminAuthMiddleware token ", token);
      if (isEmpty(token)) {
        // 无法通过token校验
        this.reject(ctx, { code: 11001 });
        return;
      }
      try {
        // 挂载对象到当前请求上
        ctx.admin = this.jwtService.verifySync(token, {}) as Token;
        this.logger.debug("verify token %s to payload %j", token, ctx.admin);
      } catch (e) {
        // 无法通过token校验
        this.reject(ctx, { code: 11001 });
        return;
      }
      // pass
      await next();
    };
  }

  private reject(ctx: Context, op: RespOp): void {
    ctx.status = 200;
    ctx.body = Resp(op);
  }

  // match?: (ctx?: Context<unknown>) => boolean;
  // ignore?: (ctx?: Context<unknown>) => boolean;
}
