import { App, Configuration } from "@midwayjs/decorator";
import { ILifeCycle } from "@midwayjs/core";
import * as orm from "@midwayjs/orm";
import * as swagger from "@midwayjs/swagger";
import * as jwt from "@midwayjs/jwt";
import * as validate from "@midwayjs/validate";
import * as redis from "@midwayjs/redis";

import { Application } from "egg";
import { join } from "path";
import * as egg from "@midwayjs/web";

@Configuration({
  conflictCheck: true, // 启用类名冲突检查
  imports: [
    egg, //eggs
    orm,
    jwt,
    validate,
    redis,
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
