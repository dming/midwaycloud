import { MoleculerConfig } from "@dming/mwcloud-moleculer";

export default {
  namespace: "backend",
  transporter: "nats://nats:4222",
} as MoleculerConfig;
