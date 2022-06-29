import { BrokerOptions } from "moleculer";

export interface MoleculerConfig extends BrokerOptions {
  // brokerName: string;
  // brokerType: string; //means the server type of instance
  serviceFolder?: [string, string?][];
  isFrontend?: boolean; //determine if this server is frontend; if not, middleware will intercept all request from controller;
}
