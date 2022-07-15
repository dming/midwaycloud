const { Bootstrap } = require("@midwayjs/bootstrap");
const opentelemetry = require("@opentelemetry/sdk-node");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { JaegerPropagator } = require("@opentelemetry/propagator-jaeger");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
// const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const { diag } = require("@opentelemetry/api");

console.warn("myotel bootstrap at ", __dirname);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function initMyOtel() {
  diag.setLogger(console);

  const traceExporter = new JaegerExporter({
    tags: [],
    // You can use the default UDPSender
    host: "ja", // optional
    port: 6832, // optional
    // OR you can use the HTTPSender as follows
    // endpoint: 'http://localhost:14368/api/traces',
    maxPacketSize: 65000, // optional
  });

  const sdk = new opentelemetry.NodeSDK({
    // 配置当前的导出方式，比如这里配置了一个输出到控制台的，也可以配置其他的 Exporter，比如 Jaeger
    traceExporter: traceExporter,
    textMapPropagator: new JaegerPropagator(),
    // 这里配置了默认自带的一些监控模块，比如 http 模块等
    instrumentations: [getNodeAutoInstrumentations()],
  });

  await sdk.start().then(() => {
    console.log(">>> opentelemetry >>> already started.");
    return Bootstrap.run();
  });
  console.warn(" myotel done at ", __dirname);

  // 在进程关闭时，同时关闭数据采集
  process.on("SIGTERM", () => {
    sdk
      .shutdown()
      .then(() => console.log("Tracing terminated"))
      .catch(error => console.log("Error terminating tracing", error))
      .finally(() => process.exit(0));
  });

  return "initMyOtel done";
}
// module.exports = initMyOtel();
