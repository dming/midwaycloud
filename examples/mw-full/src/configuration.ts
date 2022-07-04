import { App, Configuration, Inject } from "@midwayjs/decorator";
import { ILifeCycle } from "@midwayjs/core";
import * as orm from "@midwayjs/orm";
import * as swagger from "@midwayjs/swagger";
import * as jwt from "@midwayjs/jwt";
import * as validate from "@midwayjs/validate";
import * as redis from "@midwayjs/redis";
import * as moleculer from "@dming/mwcloud-moleculer";

import { Application } from "egg";
import { join } from "path";
import * as egg from "@midwayjs/web";
import { Service } from "moleculer";

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
    moleculer,
  ],
  importConfigs: [join(__dirname, "./config")],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @Inject()
  moleculer: moleculer.MoleculerService;

  async onReady() {
    console.log(
      this.moleculer.broker.nodeID,
      ">>>>>>>> ",
      this.moleculer.broker.services.map((service: Service) => {
        return service.name + "|||" + service.fullName;
      })
    );
  }
}
