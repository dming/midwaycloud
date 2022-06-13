import { Init, Provide, Scope, ScopeEnum } from "@midwayjs/decorator";

@Provide()
@Scope(ScopeEnum.Singleton)
export class MWCloudUtilsService {
  @Init()
  public async init() {}
}
