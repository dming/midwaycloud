import { MoleculerConfig } from "@dming/mwcloud-moleculer";
import { resolve } from "path";

const config: Omit<MoleculerConfig, "namespace"> = {
  serviceFolder: [
    [
      resolve(process.cwd(), "src/moleculer/service/backend"),
      "**/*.mservice.{ts,js}",
    ],
  ],
};

export default config;
