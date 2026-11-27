import { Scheduler } from './scheduler/index.js';
import { EngineStatus } from './status.js';

import type { Clock } from './_types/clock.js';
import type { EngineModule } from './_types/module.js';
import type { Schedule } from './_types/schedule.js';

export class EngineCore {
  private readonly _scheduler = new Scheduler();

  private _status = EngineStatus.Halted;

  public constructor(
    private readonly _clock: Clock,
    private readonly _schedule: Schedule
  ) {}

  private async _tick(): Promise<void> {
    if (this._status !== EngineStatus.Running) return;
    this._clock.tick();
    this._scheduler.modules.forEach((module) => {
      module.tick();
    });

    this._schedule(() => void this._tick());
  }

  public start(): void {
    if (this._status !== EngineStatus.Halted) return;
    this._status = EngineStatus.Running;
    this._clock.start();
    void this._tick();
  }

  public stop(): void {
    if (this._status !== EngineStatus.Running) return;
    this._status = EngineStatus.Halted;
  }

  public dispose(): void {
    this.stop();
    this._status = EngineStatus.Disposed;
    // @todo - add dispose logic to clean up the engine and its resources
  }

  public registerModule(module: EngineModule): void {
    if (this._status !== EngineStatus.Halted) return;
    this._scheduler.registerModule(module);
  }
}
