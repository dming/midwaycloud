import {
  App,
  Configuration,
  Inject,
  JoinPoint,
  Logger,
} from "@midwayjs/decorator";
import { ILifeCycle, ILogger, MidwayDecoratorService } from "@midwayjs/core";
import * as orm from "@midwayjs/orm";
import * as swagger from "@midwayjs/swagger";
import * as jwt from "@midwayjs/jwt";
import * as validate from "@midwayjs/validate";
import * as redis from "@midwayjs/redis";
import * as otel from "@midwayjs/otel";
import * as egg from "@midwayjs/web";
import * as moleculer from "@dming/mwcloud-moleculer";
import * as promethues from "@midwayjs/prometheus";

import { Application } from "egg";
import { join } from "path";
import { Service } from "moleculer";
import { TraceService } from "@midwayjs/otel";
import { SpanStatusCode } from "@opentelemetry/api";
import { initOtelSDK } from "./otel";
import { isTypeScriptEnvironment } from "@midwayjs/bootstrap";
import { diag } from "@opentelemetry/api";

@Configuration({
  conflictCheck: true, // 启用类名冲突检查
  imports: [
    egg, //eggs
    orm,
    jwt,
    validate,
    redis,
    otel,
    {
      component: swagger, // 加载 swagger 组件
      enabledEnvironment: ["local"],
    },
    moleculer,
    promethues,
  ],
  importConfigs: [join(__dirname, "./config")],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @Inject()
  moleculer: moleculer.MoleculerService;

  @Inject()
  decoratorService: MidwayDecoratorService;

  @Inject()
  traceService: TraceService;

  @Logger()
  logger: ILogger;

  async onConfigLoad() {
    const isTsEnv = isTypeScriptEnvironment();
    this.logger.info("<<<<<<<<<< onConfigLoad ", isTsEnv);
    if (isTsEnv) {
      await initOtelSDK();
    }
  }

  async onReady() {
    this.logger.info("<<<<<<<<<< onReady ");
    this.logger.info(
      this.moleculer.broker.nodeID,
      ">>>>>>>> ",
      this.moleculer.broker.services.map((service: Service) => {
        return service.name + "|||" + service.fullName;
      })
    );

    diag.setLogger(this.logger as any);
    this.decoratorService.registerMethodHandler(otel.TRACE_KEY, options => {
      return {
        around: async (joinPoint: JoinPoint) => {
          // 记录开始时间
          return this.traceService.createSpan(
            options.metadata["spanName"],
            async span => {
              try {
                // 执行原方法
                const result = await joinPoint.proceed(...joinPoint.args);
                span.setStatus({
                  code: SpanStatusCode.OK,
                });
                span.end();
                // 返回执行结果
                this.logger.info(">>> span >> ", span);
                this.logger.info(
                  otel?.TRACE_KEY,
                  " >>> call info >> ",
                  joinPoint,
                  result?.toString()
                );
                return result;
              } catch (err) {
                span.setStatus({
                  code: SpanStatusCode.ERROR,
                });
                span.recordException(err);
                span.end();
                throw err;
              }
            }
          );
        },
      };
    });
  }
}
