import { MoleculerConfig } from "@dming/mwcloud-moleculer";

export default {
  namespace: "frontend",
  transporter: "nats://nats:4222",
} as MoleculerConfig;
