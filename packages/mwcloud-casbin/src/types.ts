import { Enforcer, Watcher } from "casbin";
import type { TypeORMAdapterOptions } from "typeorm-adapter";
import { CasbinConfigKey } from "./constant";

// export interface Casbin

export interface CasbinConfig {
  newEnforcer?: () => Promise<Enforcer>;

  modelPath: string;
  policyType: "adapterTypeorm" | "file";
  policyPath?: string;
  typeorm?: TypeORMAdapterOptions;

  newWatcher?: () => Promise<Watcher>;
}

export type CasbinWhitelist = string | RegExp | (string | RegExp)[];

export interface CasbinMiddlewareConfig {
  [CasbinConfigKey.whitelist]: string | RegExp | (string | RegExp)[];
}
