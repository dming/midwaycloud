import { IMidwayApplication } from "@midwayjs/core";
import { App, Config, Configuration } from "@midwayjs/decorator";
import { join } from "path";
import assert from "assert";
import { CasbinConfigKey } from "./constant";
import { CasbinMiddlewareConfig } from "./types";

@Configuration({
  namespace: `${CasbinConfigKey.namespace}`,
  importConfigs: [join(__dirname, "config")],
})
export class BookConfiguration {
  @App() readonly app: IMidwayApplication;

  @Config(CasbinConfigKey.middlewareConfig)
  protected readonly middlewareConfig: CasbinMiddlewareConfig;

  async onReady() {
    // TODO something
    assert(this.app, "this.app must be set");
  }
}
