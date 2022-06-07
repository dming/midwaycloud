import {
  Provide,
  Controller,
  Get,
  Inject,
  Query,
  ALL,
} from "@midwayjs/decorator";
import { CreateApiDoc } from "@midwayjs/swagger";
import { Validate } from "@midwayjs/validate";
import { Context } from "egg";
import { UserService } from "../../../service/user.service";
import {
  ADMIN_PREFIX_URL,
  NOPERM_PREFIX_URL,
  Resp,
  RespResult,
} from "../../base";

@Provide()
@Controller(`${ADMIN_PREFIX_URL}${NOPERM_PREFIX_URL}/`, {
  tagName: "AdminAccount",
  description: "backend account controller",
})
// extends BaseController
export class AdminAccountController {
  @Inject()
  userService: UserService;

  @CreateApiDoc()
    .summary("获取管理员角色")
    .param("管理员登录信息参数")
    .respond(200, "", "json", {
      // example: GetLoginTokenExample,
    })
    .build()
  @Get("/getUserRoles")
  @Validate()
  async getUserRoles(ctx: Context, @Query(ALL) query): Promise<RespResult> {
    const uid = ctx.admin?.uid;
    console.debug("getUserRoles ", uid, query);
    if (!uid) {
      return Resp({ code: 1004 });
    }
    const user = await this.userService.getUserInfo(uid);
    if (user) {
      console.debug("getUserRoles user", user);
      return Resp({
        data: {
          roles: {
            roleName: "Super Admin",
            value: "super",
          },
        },
      });
    } else {
      return Resp({ code: 1005 });
    }
  }
}
