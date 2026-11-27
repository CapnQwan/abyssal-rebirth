import type { Clock } from '../_types/index.js';

export class FixedClock implements Clock {
  private _deltaTime = 16.67;
  private _timestamp = 0;
  private _elapsedTime = 0;

  public start(): void {
    this._elapsedTime = 0;
    this._timestamp = 0;
  }

  public tick(): void {
    this._elapsedTime += this._deltaTime;
    this._timestamp += this._deltaTime;
  }

  public get deltaTime(): number {
    return this._deltaTime;
  }

  public get timestamp(): number {
    return this._timestamp;
  }

  public get elapsedTime(): number {
    return this._elapsedTime;
  }
}
