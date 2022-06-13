import { IMidwayApplication } from "@midwayjs/core";
import { App, Configuration } from "@midwayjs/decorator";
import { join } from "path";
import { UtilsKey } from "./constant";

@Configuration({
  namespace: `${UtilsKey.namespace}`,
  importConfigs: [join(__dirname, "config")],
})
export class BookConfiguration {
  @App() readonly app: IMidwayApplication;

  async onReady() {
    // TODO something
  }
}
