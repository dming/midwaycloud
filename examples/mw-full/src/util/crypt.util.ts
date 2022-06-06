import { Provide, Scope, ScopeEnum } from "@midwayjs/decorator";
import * as CryptoJS from "crypto-js";
@Provide()
@Scope(ScopeEnum.Singleton)
export class CryptUtil {
  /**
   * md5加密
   */
  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }
}
