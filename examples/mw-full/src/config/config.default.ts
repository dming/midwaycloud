import { MidwayConfig, MidwayAppInfo } from "@midwayjs/core";
import * as path from "path";
import * as fs from "fs";

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + "_1654078016898_428",

    // 配置网站图标 可为网络图标
    siteFile: {
      "/favicon.ico": fs.readFileSync(
        path.join(__dirname, "../../favicon.ico")
      ),
    },

    // jwt 密钥
    jwt: {
      secret: "INnyQ50BEE6AITQraIaDGooJ",
    },

    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
