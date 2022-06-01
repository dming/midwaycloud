import { EggAppConfig, PowerPartial } from "egg";
import { MidwayConfig } from "@midwayjs/core";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default {
  egg: {
    port: null,
  },
  security: {
    csrf: { enable: false },
  },
} as MidwayConfig & DefaultConfig;
