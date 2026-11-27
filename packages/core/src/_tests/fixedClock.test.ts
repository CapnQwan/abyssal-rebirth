import { describe, expect, it } from 'vitest';

import { FixedClock } from '../clocks/fixedClock.js';

describe('fixedClock', () => {
  const clock = new FixedClock();

  it('should return the correct fixed deltaTime of 16.67', () => {
    expect(clock.deltaTime).toBe(16.67);
  });
});
