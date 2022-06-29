import { IMidwayApplication } from "@midwayjs/core";
import { App, Configuration } from "@midwayjs/decorator";
import { join } from "path";
import { MoleculerConfigKey } from "./constant";

@Configuration({
  namespace: `${MoleculerConfigKey.namespace}`,
  importConfigs: [join(__dirname, "config")], //加载的确实就是本组件内的对应config文件夹里的内容，可以用作组件的缺省配置，但不可用作最终配置
})
export class AutoConfiguration {
  @App() readonly app: IMidwayApplication;

  async onReady() {
    // TODO something
  }
}
