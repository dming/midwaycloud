import { CreateApiPropertyDoc } from "@midwayjs/swagger";
import { Rule, RuleType } from "@midwayjs/validate";
import { Expose } from "class-transformer";

export class LoginInfoDto {
  @CreateApiPropertyDoc("管理员用户名", { example: "root" })
  @Rule(RuleType.string().required())
  @Expose()
  username: string;

  @CreateApiPropertyDoc("管理员密码", { example: "123456" })
  @Rule(RuleType.string().required())
  @Expose()
  password: string;

  // @CreateApiPropertyDoc("验证码标识ID", { example: "0CRq2jthWUp7DiLCftB-P" })
  // @Rule(RuleType.string().required())
  // @Expose()
  // captchaId: string;

  // @CreateApiPropertyDoc("登录验证码", { example: "xfDp" })
  // @Rule(RuleType.string().max(4).min(4).required())
  // @Expose()
  // verifyCode: string;
}
