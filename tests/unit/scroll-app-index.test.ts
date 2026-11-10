import { describe, expect, it } from 'vitest';
import { appIndexFromProgress } from '../../src/features/apps-showcase/lib/scroll-app-index';

describe('appIndexFromProgress', () => {
  it('maps progress bands onto successive apps', () => {
    expect(appIndexFromProgress(0, 5)).toBe(0);
    expect(appIndexFromProgress(0.19, 5)).toBe(0);
    expect(appIndexFromProgress(0.2, 5)).toBe(1);
    expect(appIndexFromProgress(0.99, 5)).toBe(4);
    expect(appIndexFromProgress(1, 5)).toBe(4);
  });

  it('clamps empty and single-app tracks', () => {
    expect(appIndexFromProgress(0.5, 0)).toBe(0);
    expect(appIndexFromProgress(0.9, 1)).toBe(0);
  });
});
