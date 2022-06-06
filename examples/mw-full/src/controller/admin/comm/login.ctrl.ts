import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Provide,
} from "@midwayjs/decorator";
import { JwtService } from "@midwayjs/jwt";
import { CreateApiDoc } from "@midwayjs/swagger";
import { Validate } from "@midwayjs/validate";
import { isEmpty } from "lodash";
import { LoginInfoDto } from "../../../dto/admin/verify.dto";
import type { ResOp } from "../../../interface";
import { UserService } from "../../../service/user.service";
import { Res } from "../../../util/comm.util";
import { ADMIN_PREFIX_URL, NOAUTH_PREFIX_URL } from "../../base";

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/${NOAUTH_PREFIX_URL}/`, {
  tagName: "AdminLogin",
  description: "backend login controller",
})
// extends BaseController
export class AdminLoginController {
  @Inject()
  jwtService: JwtService;
  @Inject()
  userService: UserService;

  @CreateApiDoc()
    .summary("管理员登录")
    .param("管理员登录信息参数")
    .respond(200, "", "json", {
      // example: GetLoginTokenExample,
    })
    .build()
  @Post("/login")
  @Validate()
  async login(@Body(ALL) loginInfo: LoginInfoDto): Promise<ResOp> {
    const sign = await this.userService.getLoginSign(
      loginInfo.username,
      loginInfo.password
    );

    if (isEmpty(sign)) {
      return { code: 10003 };
    }
    return Res({
      data: { token: sign },
    });
  }
}
