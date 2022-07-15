import { MoleculerConfig } from "@dming/mwcloud-moleculer";
import { resolve } from "path";

const config: Omit<MoleculerConfig, "namespace"> = {
  transporter: "nats://127.0.0.1:4222",
  // transporter: "redis://127.0.0.1:6379",
  registry: {
    discoverer: "redis://123456root@127.0.0.1:6379",
    // Define balancing strategy. More info: https://moleculer.services/docs/0.14/balancing.html
    // Available values: "RoundRobin", "Random", "CpuUsage", "Latency", "Shard"
    strategy: "RoundRobin",
    // Enable local action call preferring. Always call the local action instance if available.
    preferLocal: true,
  },
  serviceFolder: [
    [
      resolve(process.cwd(), "src/moleculer/service/default"),
      "**/*.mservice.{ts,js}",
    ],
  ],
};

export default config;
