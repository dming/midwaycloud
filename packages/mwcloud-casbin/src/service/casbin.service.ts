import { Config, Init, Provide, Scope, ScopeEnum } from "@midwayjs/decorator";
import { Enforcer, Watcher } from "casbin";
import { CasbinConfigKey } from "src/constant";
import { CasbinConfig } from "src/types";
import TypeORMAdapter from "typeorm-adapter";

@Provide(`${CasbinConfigKey.serviceName}`)
@Scope(ScopeEnum.Singleton)
export class CasbinService {
  private _enforcer: Enforcer;
  public get enforcer() {
    return this._enforcer;
  }

  @Config(`${CasbinConfigKey.config}`)
  private config: CasbinConfig;

  @Init()
  public async init() {
    if (this._enforcer) {
      return;
    }

    if (this.config.newEnforcer) {
      this._enforcer = await this.config.newEnforcer();
      if (!(this._enforcer instanceof Enforcer)) {
        throw new Error("CasbinService newEnforcer Error");
      }
      return;
    }
    this._enforcer = await this.initWithOptions();
  }

  private async initWithOptions(): Promise<Enforcer> {
    const enforcer = new Enforcer();
    switch (this.config.policyType) {
      case "file":
        enforcer.initWithFile(this.config.modelPath, this.config.policyPath);
        break;
      case "adapterTypeorm":
        enforcer.initWithAdapter(
          this.config.modelPath,
          await TypeORMAdapter.newAdapter(this.config.typeorm)
        );
        break;
      default:
        throw new Error(
          ` CasbinConfig policyType Error: ${this.config.policyType}`
        );
      // break;
    }
    if (this.config.newWatcher) {
      const watcher: Watcher = await this.config.newWatcher();
      enforcer.setWatcher(watcher);
    }
    return enforcer;
  }
}
