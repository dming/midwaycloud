import { CODE } from "../constant/code.constant";

export const ADMIN_PREFIX_URL = "/admin";

// 无需权限URL前缀
export const NOPERM_PREFIX_URL = "/common";
// 无需校验TOKEN的URL
export const NOAUTH_PREFIX_URL = "/public";

export type RespOp<T = any> =
  | {
      code: CODE;
      data?: T;
      message?: string;
    }
  | {
      code?: CODE;
      data: T;
      message?: string;
    };

export interface RespResult<T = any> {
  code: CODE;
  result: T;
  type?: "success" | "error" | "warning";
  message?: string;
}

export function Resp<T = any>(op?: RespOp<T>): RespResult<T> {
  return {
    code: op?.code || CODE.SUCCESS,
    result: op?.data || undefined,
    type: GetRespTypeByCode(op?.code),
    message: op?.message
      ? op.message
      : GetRespMessageByCode(op?.code) || "unknown error",
  };
}

function GetRespTypeByCode(
  code: CODE = CODE.SUCCESS
): "success" | "error" | "warning" {
  return code === CODE.SUCCESS ? "success" : "error"; //need fix
}

function GetRespMessageByCode(code: CODE): string {
  return "message by code " + code; //need fix
}
