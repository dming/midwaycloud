import { EggAppConfig, PowerPartial } from "egg";
import { MidwayConfig } from "@midwayjs/core";

export type DefaultConfig = PowerPartial<EggAppConfig>;

/**
 * 这里加入这段是因为 egg 默认的安全策略，在 post 请求的时候如果不传递 token 会返回 403
 * 由于大部分新手用户不太了解这个机制，所以在本地和单测环境做了默认处理
 * 请注意，线上环境依旧会有该错误，需要手动开启
 * 如果想了解更多细节，请访问 https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范
 */
export default {
  security: {
    csrf: { enable: false },
  },

  orm: {
    type: "mysql",
    host: "mysql", //for docker
    port: 3306,
    username: "root",
    password: "dming",
    database: "my-admin",
    synchronize: false,
    logging: true,
    // timezone: '+00:00',
    /**
     * JavaScript对数据库中int和bigint的区别对待：
     * 刚开始开发中，线下测试数据库id字段采用int，数据库SELECT操作返回的结果是Number，但是使用bigint，数据库返回的为String，
     * 初步猜想是因为bigint的值范围会超过Number，所以采用String。但是这样会对我们业务产生巨大影戏那个，一方面，DTO校验会无法通过，另一方面，问题1中的业务逻辑会受影响。
     * 经过查找各方文档，解决方案是在数据库连接配置中配置：
     * "supportBigNumbers": false
     * 可以配置这个的原因是我们的业务ID距离Number的上线远远达不到，所以可以用这种方式让
     * bigint也返回Number。
     * 但是这样配置，TypeOrm插入操作的返回值中的identifiers字段中的id还是String，所以问题1中的处理方式也要对String进行parseInt操作。
     */
    // supportBigNumbers: false,
  },

  // midway redis
  redis: {
    client: {
      port: 6379, // Redis port
      host: "redis", // Redis host
      password: "123456root",
      db: 0,
    },
  },
} as MidwayConfig & DefaultConfig;
