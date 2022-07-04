import { Context, Service as MService } from "moleculer";
import { Action, Event, Method, Service } from "moleculer-decorators";
@Service({
  name: "backend", //看看会不会冲突
  settings: {
    port: 3000,
  },
})
export default class BackendMService extends MService {
  //   settings = {} as ServiceSettingSchema;

  @Action()
  sayHello(ctx: Context): string {
    console.log(
      "<<< default.mservice.ts  sayHello>>> ",
      ctx.id,
      ctx.nodeID,
      ctx.parentID
    );
    return "hello, default";
  }

  @Event()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  "event.backend.hello"(payload, sender, eventName) {}

  @Method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorize(ctx, route, req, res) {}
}
