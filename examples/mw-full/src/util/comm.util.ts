import type { ResOp } from "../interface";

export function Res(op?: ResOp): ResOp {
  return {
    data: op?.data ?? null,
    code: op?.code ?? 200,
    message: op?.code
      ? GetErrorMessageByCode(op!.code) || op?.message || "unknown error"
      : op?.message || "success",
  };
}

const ErrorConstants = {};
/**
 * 根据code获取错误信息
 */
export function GetErrorMessageByCode(code: number): string {
  return ErrorConstants[code];
}
