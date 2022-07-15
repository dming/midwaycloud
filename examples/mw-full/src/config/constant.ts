export const STYPE = process.env.MOLECULER_SERVICE || "default";
export const STYPE_NUM = process.env.MOLECULER_SERVICE_NUM ?? 0;
export const SERVICE_NAME = `${STYPE}-${STYPE_NUM}`;
