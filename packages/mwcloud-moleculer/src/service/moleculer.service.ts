import { IMidwayApplication } from "@midwayjs/core";
import {
  App,
  Config,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from "@midwayjs/decorator";
import cluster from "cluster";
import { ServiceBroker } from "moleculer";
import { MoleculerConfigKey } from "src/constant";
import { MoleculerConfig } from "src/types";
import _ from "lodash";

/**
 * 目标是创建broker并返回即可
 */
@Provide()
@Scope(ScopeEnum.Singleton)
export class MoleculerService {
  private _broker: ServiceBroker;
  public get broker(): ServiceBroker {
    return this._broker;
  }

  @App()
  app: IMidwayApplication;

  @Config(`${MoleculerConfigKey.config}`)
  moleculerConfig: MoleculerConfig;

  @Init()
  public async init() {
    const namespace = this.moleculerConfig.namespace || process.env.SERVER_TYPE;
    const env = this.app.getEnv();
    this._broker = new ServiceBroker({
      namespace,
      nodeID: `${env}-${namespace}-${
        env === "local" ? "local" : cluster.worker.id
      }`,
      ...this.moleculerConfig,
    });

    if (!_.isEmpty(this.moleculerConfig.serviceFolder)) {
      this.moleculerConfig.serviceFolder.forEach((value: [string, string?]) => {
        this._broker.loadServices(...value);
      });
    }
  }
}
