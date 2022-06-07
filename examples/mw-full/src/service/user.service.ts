import { Inject, Provide } from "@midwayjs/decorator";
import { JwtService } from "@midwayjs/jwt";
import { InjectEntityModel } from "@midwayjs/orm";
import { RedisService } from "@midwayjs/redis";
import { isEmpty } from "lodash";
import { Repository } from "typeorm";
import { REDIS_ADMIN_TOKEN } from "../constant/base.constant";
import { SysUserEntity } from "../entity/admin/sys/user.entity";
import { CryptUtil } from "../util/crypt.util";

@Provide()
export class UserService {
  @Inject()
  redisService: RedisService;

  @InjectEntityModel(SysUserEntity)
  userRepo: Repository<SysUserEntity>;

  @Inject()
  cryptUtil: CryptUtil;

  @Inject()
  jwtService: JwtService;

  /**
   * 获取登录JWT
   * 返回null则账号密码有误，不存在该用户
   */
  async getLoginSign(username: string, password: string): Promise<string> {
    const user = await this.userRepo.findOne({
      where: { username, status: 1 },
    });

    if (isEmpty(user)) {
      return null;
    }

    const cryPass = this.cryptUtil.md5(`${password}${user.psalt}`);
    if (user.password !== cryPass) {
      return null;
    }

    const pv = 1;
    const jwtSign = this.jwtService.signSync(
      {
        uid: parseInt(user.id.toString()),
        pv,
      },
      {
        expiresIn: "12h",
      }
    );

    this.redisService.set(
      `${REDIS_ADMIN_TOKEN}${user.id}`,
      `${pv}|||${jwtSign}`
    );
    return jwtSign;
  }

  async getUserInfo(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return user;
  }
}
