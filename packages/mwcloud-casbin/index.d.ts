export * from "./dist/index";
import {
  CasbinConfig,
  CasbinConfigKey,
  CasbinMiddlewareConfig,
} from "./dist/index";

declare module "@midwayjs/core/dist/interface" {
  interface MidwayConfig {
    [CasbinConfigKey.config]?: CasbinConfig;
    [CasbinConfigKey.middlewareConfig]?: CasbinMiddlewareConfig;
  }
}
