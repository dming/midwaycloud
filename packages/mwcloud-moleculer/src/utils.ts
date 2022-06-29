import { resolve } from "path";
import type { MoleculerConfig } from "./index";

export function importMoleculerConfig(
  stype: string,
  dirname: string = __dirname
): MoleculerConfig {
  const defConf = require(resolve(dirname, "./moleculer/moleculer.config"));
  const defConfValue = defConf.default || defConf;
  const typeConf = require(resolve(dirname, `./moleculer/${stype}.mconf`));
  const typeConfValue = typeConf.default || typeConf;
  const config = Object.assign({}, defConfValue, typeConfValue);
  return config;
}
