import type { EngineModule } from '../_types/module.js';

export class Scheduler {
  private _modules: EngineModule[] = [];

  public get modules(): EngineModule[] {
    return this._modules;
  }

  public registerModule(module: EngineModule): void {
    // @todo - add DAG support
    this._modules.push(module);
  }
}
