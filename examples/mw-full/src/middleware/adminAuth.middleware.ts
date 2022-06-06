import { Provide } from "@midwayjs/decorator";
import { IMiddleware, IMidwayBaseApplication } from "@midwayjs/core";
import {
  Context as WebContext,
  NextFunction as WebNextFunction,
} from "@midwayjs/web";

@Provide()
export class AdminAuthMiddleware
  implements IMiddleware<WebContext, WebNextFunction>
{
  resolve(app?: IMidwayBaseApplication<WebContext>) {
    return async (ctx: WebContext, next: WebNextFunction) => {
      const url = ctx.url;
      console.log("AdminAuthMiddleware url ", url);
      // const path = url.split("?")[0];
      // const token = ctx.get("Authorization");
      next();
    };
  }

  // match?: (ctx?: Context<unknown>) => boolean;
  // ignore?: (ctx?: Context<unknown>) => boolean;
}
