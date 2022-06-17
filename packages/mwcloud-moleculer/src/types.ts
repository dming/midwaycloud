import { BrokerOptions } from "moleculer";

export interface MoleculerConfig extends BrokerOptions {
  brokerName: string;
  brokerType: string; //means the server type of instance
  serviceFolder: [string, string?][];
}
