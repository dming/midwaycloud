import { App, Configuration } from "@midwayjs/decorator";
import { ILifeCycle } from "@midwayjs/core";
import * as orm from "@midwayjs/orm";
import * as swagger from "@midwayjs/swagger";

import { Application } from "egg";
import { join } from "path";
import * as egg from "@midwayjs/web";

@Configuration({
  imports: [
    egg, //eggs
    orm,
    {
      component: swagger, // 加载 swagger 组件
      enabledEnvironment: ["local"],
    },
  ],
  importConfigs: [join(__dirname, "./config")],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
