import { MidwayConfig, MidwayAppInfo } from "@midwayjs/core";
import { MoleculerConfigKey } from "../constant";
import { importMoleculerConfig } from "../utils";
const STYPE = "default"; // or reading process.env.MOLECULER_SERVICE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const config: MidwayConfig = {
    [MoleculerConfigKey.config]: importMoleculerConfig(STYPE, __dirname),
  };
  return config;
};
