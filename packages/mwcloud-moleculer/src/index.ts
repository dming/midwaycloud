export { AutoConfiguration as Configuration } from "./configuration";
export * from "./types";
export * from "./constant";
import { MoleculerConfigKey } from "./constant";
import { MoleculerConfig } from "./types";

declare module "@midwayjs/core/dist/interface" {
  interface MidwayConfig {
    [MoleculerConfigKey.config]: MoleculerConfig;
  }
}
