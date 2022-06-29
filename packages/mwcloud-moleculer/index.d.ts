export * from "./dist/index";

import { MoleculerConfigKey } from "./dist/index";
import { MoleculerConfig } from "./dist/index";

declare module "@midwayjs/core/dist/interface" {
  interface MidwayConfig {
    [MoleculerConfigKey.config]: MoleculerConfig;
  }
}
