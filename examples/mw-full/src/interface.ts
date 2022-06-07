/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface Token {
  uid: number;
  pv: number;
}
declare module "egg" {
  interface Context {
    admin: Token;
  }
}
