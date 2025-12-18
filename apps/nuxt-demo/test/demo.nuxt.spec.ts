// @vitest-environment nuxt
import { describe, it, expect } from 'vitest';

describe('demo', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  it('should be false', () => {
    expect(false).toBe(false);
  });
  it('should be null', () => {
    expect(null).toBe(null);
  });
  it('should be undefined', () => {
    expect(undefined).toBe(undefined);
  });
  it('should be 0', () => {
    expect(0).toBe(0);
  });
});
