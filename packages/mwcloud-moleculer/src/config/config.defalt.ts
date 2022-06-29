import { MidwayConfig, MidwayAppInfo } from "@midwayjs/core";
import { MoleculerConfigKey } from "src/constant";
import { importMoleculerConfig } from "src/utils";
const STYPE = process.env.MOLECULER_SERVICES || "api";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const config: MidwayConfig = {
    [MoleculerConfigKey.config]: importMoleculerConfig(STYPE, __dirname),
  };
  return config;
};
