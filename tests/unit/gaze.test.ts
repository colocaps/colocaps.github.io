import { describe, expect, it } from 'vitest';
import { gazeFromPointer, idleGaze, lerp, pointerToUnit } from '../../src/features/hero/lib/gaze';

describe('gaze', () => {
  it('maps the stage centre to the origin and clamps edges', () => {
    const rect = { left: 0, top: 0, width: 200, height: 100 } as DOMRect;
    expect(pointerToUnit({ x: 100, y: 50 }, rect)).toEqual({ x: 0, y: 0 });
    expect(pointerToUnit({ x: -50, y: 200 }, rect)).toEqual({ x: -1, y: 1 });
  });

  it('turns the head toward the pointer with inverted pitch', () => {
    expect(gazeFromPointer({ x: 1, y: 0 }).yaw).toBeGreaterThan(0);
    expect(gazeFromPointer({ x: 0, y: 1 }).pitch).toBeLessThan(0);
    const rest = gazeFromPointer({ x: 0, y: 0 });
    expect(rest.yaw).toBe(0);
    expect(Object.is(rest.pitch, -0) || rest.pitch === 0).toBe(true);
  });

  it('sways gently while idle', () => {
    expect(idleGaze(0).yaw).toBe(0);
    expect(idleGaze(Math.PI / 2).yaw).not.toBe(0);
  });

  it('lerps toward the target', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
});
