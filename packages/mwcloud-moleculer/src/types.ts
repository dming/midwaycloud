import { BrokerOptions } from "moleculer";

export interface MoleculerConfig extends BrokerOptions {
  // serviceType: string; //means the server type of instance
  serviceFolder?: [string, (string | Array<string>)?][];
  isFrontend?: boolean; //determine if this server is frontend; if not, middleware will intercept all request from controller;
}
