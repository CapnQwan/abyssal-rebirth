import { describe, expect, it, vi } from 'vitest';

import { FixedClock } from '../clocks/index.js';
import { EngineCore } from '../core.js';
import { EngineStatus } from '../status.js';

import type { Clock } from '../_types/index.js';
import type { EngineModule } from '../_types/module.js';
import type { Schedule } from '../_types/schedule.js';
import type { Scheduler } from '../scheduler/index.js';

class DummyModule implements EngineModule {
  public name = 'dummy';
  public requires: string[] = [];
  public tickCount = 0;
  public tick = vi.fn();
  public initialize = vi.fn();
  public dispose = vi.fn();
}

const clock = new FixedClock();

/** @todo - this should be a proper scheduler this version blocks I/O and causes vitest to hang if the engine is not stopped */
/** @todo - also a manual ticker schedule would be nice to have for testing too */
const schedule: Schedule = (callback: () => void) => void Promise.resolve().then(callback);

interface PublicEngineCore {
  _status: EngineStatus;
  _scheduler: Scheduler;
  _clock: Clock;
  _tick: () => Promise<void>;
  start: () => void;
  stop: () => void;
  dispose: () => void;
  registerModule: (module: EngineModule) => void;
}

function toPublic(core: EngineCore): PublicEngineCore {
  return core as unknown as PublicEngineCore;
}

describe('core', () => {
  it('should register a module', () => {
    const module = new DummyModule();
    const core = new EngineCore(clock, schedule);

    core.registerModule(module);
    expect(toPublic(core)._scheduler.modules).toContain(module);
    core.dispose();
  });

  it('should start the engine', () => {
    const core = new EngineCore(clock, schedule);

    core.start();
    expect(toPublic(core)._status).toBe(EngineStatus.Running);
    core.stop();
    core.dispose();
  });

  it('should tick the engine', async () => {
    const ticks = 1000;

    const module = new DummyModule();
    const core = new EngineCore(clock, schedule);
    core.registerModule(module);

    await new Promise((resolve) => {
      module.tick = vi.fn(() => {
        module.tickCount++;
        if (module.tickCount === ticks) {
          resolve(true);
          core.stop();
        }
      });
      core.start();
    });

    expect(module.tickCount).toBe(ticks);
    expect(toPublic(core)._status).toBe(EngineStatus.Halted);
  }, 100000);

  it('should allow the host to handle inputs', async () => {
    const core = new EngineCore(clock, schedule);

    core.start();
    expect(toPublic(core)._status).toBe(EngineStatus.Running);
    core.stop();
    expect(toPublic(core)._status).toBe(EngineStatus.Halted);
  });
});
