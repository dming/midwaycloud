import { Context, Service as MService } from "moleculer";
import { Action, Event, Method, Service } from "moleculer-decorators";
@Service({
  name: "frontend",
  settings: {
    port: 3000,
  },
})
export default class FrontendMService extends MService {
  //   settings = {} as ServiceSettingSchema;

  @Action()
  sayHello(ctx: Context): string {
    console.log(
      "<<< frontend.mservice.ts SayHello>>> ",
      ctx.id,
      ctx.nodeID,
      ctx.parentID
    );
    return "hello, frontend";
  }

  @Event()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  "event.frontend.hello"(payload, sender, eventName) {}

  @Method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorize(ctx, route, req, res) {}
}
