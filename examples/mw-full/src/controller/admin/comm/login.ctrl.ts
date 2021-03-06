import { MoleculerService } from "@dming/mwcloud-moleculer";
import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Provide,
  Logger,
} from "@midwayjs/decorator";
import { JwtService } from "@midwayjs/jwt";
import { Trace } from "@midwayjs/otel";
import { ILogger } from "@midwayjs/core";
import { CreateApiDoc } from "@midwayjs/swagger";
import { Validate } from "@midwayjs/validate";
import { isEmpty } from "lodash";
import { LoginInfoDto } from "../../../dto/admin/verify.dto";
import { UserService } from "../../../service/user.service";
import {
  ADMIN_PREFIX_URL,
  NOAUTH_PREFIX_URL,
  Resp,
  RespResult,
} from "../../base";

@Provide()
@Controller(`${ADMIN_PREFIX_URL}${NOAUTH_PREFIX_URL}/`, {
  tagName: "AdminLogin",
  description: "backend login controller",
})
// extends BaseController
export class AdminLoginController {
  @Inject()
  jwtService: JwtService;
  @Inject()
  userService: UserService;

  @Inject()
  moleculer: MoleculerService;

  @Logger()
  logger: ILogger;

  @CreateApiDoc()
    .summary("管理员登录")
    .param("管理员登录信息参数")
    .respond(200, "", "json", {
      // example: GetLoginTokenExample,
    })
    .build()
  @Post("/login")
  @Validate()
  @Trace("user.login")
  async login(@Body(ALL) loginInfo: LoginInfoDto): Promise<RespResult> {
    const sign = await this.userService.getLoginSign(
      loginInfo.username,
      loginInfo.password
    );

    try {
      const a = await this.moleculer.broker.call("backend.sayHello");
      this.logger.info("backend.sayhello >>>>>>>>> response is ", a);
    } catch (e) {
      this.logger.info(
        "what services is already registried:? ",
        this.moleculer.broker.registry.services.list({
          onlyLocal: false,
          onlyAvailable: true,
          skipInternal: false,
          withActions: false,
          withEvents: false,
          grouping: false,
        }),
        this.moleculer.broker.registry.nodes.list({
          onlyAvailable: false,
          withServices: false,
        })
      );
      // this.moleculer.broker
      //   .call("$node.list")
      //   .then(res => this.logger.info("moleculer services $node.list: ", res));
      // this.moleculer.broker
      //   .call("$node.services")
      //   .then(res => this.logger.info("moleculer services $node.services: ", res));
      // this.moleculer.broker
      //   .call("$node.actions")
      //   .then(res => this.logger.info("moleculer services $node.actions: ", res));
      throw e;
    }

    if (isEmpty(sign)) {
      return Resp({ code: 10003 });
    }
    return Resp({
      data: { token: sign },
    });
  }
}
