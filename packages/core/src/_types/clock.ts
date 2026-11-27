export interface ClockView {
  readonly deltaTime: number;
  readonly timestamp: number;
  readonly elapsedTime: number;
}

export interface Clock extends ClockView {
  tick(): void;
  start(): void;
}
