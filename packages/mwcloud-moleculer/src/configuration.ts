import { IMidwayApplication } from "@midwayjs/core";
import { App, Configuration } from "@midwayjs/decorator";
import { join } from "path";
import { MoleculerConfigKey } from "./constant";

@Configuration({
  namespace: `${MoleculerConfigKey.namespace}`,
  importConfigs: [join(__dirname, "config")],
})
export class AutoConfiguration {
  @App() readonly app: IMidwayApplication;

  async onReady() {
    // TODO something
  }
}
