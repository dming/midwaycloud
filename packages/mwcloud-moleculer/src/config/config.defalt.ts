import { MidwayConfig, MidwayAppInfo } from "@midwayjs/core";
import { join } from "path";
import { MoleculerConfigKey } from "src/constant";
import { MoleculerConfig } from "src/types";

const STYPE = process.env.SERVER_TYPE || "default";

function importMoleculerConfig(stype: string): MoleculerConfig {
  const defConf = require(join(__dirname, "./moleculer/moleculer.config"));
  const typeConf = require(join(__dirname, `./moleculer/${stype}.mconf`));
  const config = Object.assign({}, defConf, typeConf);
  return config;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const config: MidwayConfig = {
    [MoleculerConfigKey.config]: importMoleculerConfig(STYPE),
  };
  return config;
};
