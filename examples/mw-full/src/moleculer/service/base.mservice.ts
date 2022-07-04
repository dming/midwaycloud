import { Service as MService, ServiceBroker, ServiceSchema } from "moleculer";
import { Service } from "moleculer-decorators";

@Service({
  constructOverride: false,
})
export class BaseMService extends MService {
  constructor(broker: ServiceBroker, schema: ServiceSchema) {
    console.trace("BaseMService broker keys are ", Object.keys(broker));
    super(broker, schema);
  }
}
