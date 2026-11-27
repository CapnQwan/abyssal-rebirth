import { describe, expect, it } from 'vitest';

import { Scheduler } from '../scheduler/index.js';

describe('scheduler', () => {
  const scheduler = new Scheduler();

  it('should create a new scheduler', () => {
    expect(scheduler).toBeDefined();
  });
});
