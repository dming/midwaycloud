import { Context, IMiddleware, NextFunction } from "@midwayjs/core";
import { Config, Inject } from "@midwayjs/decorator";
import { CasbinConfigKey } from "src/constant";
import { CasbinService } from "src/service/casbin.service";
import { PathToRegexpService } from "../../../mwcloud-utils/src/service/path2regexp.service";

// @Middleware()
export abstract class BaseCasbinMiddleware
  implements IMiddleware<Context, NextFunction>
{
  static getName(): string {
    return CasbinConfigKey.middlewareName;
  }

  @Inject()
  private casbinService: CasbinService;

  @Inject()
  private pathToRegexp: PathToRegexpService;

  @Config(`${CasbinConfigKey.middlewareConfig}.${CasbinConfigKey.whitelist}`)
  private whitelist: string | RegExp | (string | RegExp)[];

  public resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { path, method } = this.getPathAndMethod(ctx);
      if (this.pathToRegexp.pathMatch(this.whitelist, path, false)) {
        await next();
      } else {
        const { role } = this.getUserRole(ctx);
        const hasPermission = this.casbinService.enforcer.enforce(
          role,
          path,
          method
        );
        if (!hasPermission) {
          throw new Error(
            `sub(${role}) does has permission to obj(${path}) by act(${method})`
          );
        }
        await next();
      }
    };
  }

  protected abstract getPathAndMethod(ctx: Context): {
    path: string;
    method: string;
  };

  protected abstract getUserRole(ctx: Context): {
    role: string;
  };
}
