import { describe, expect, it } from 'vitest';
import { pointerToUnit, restTilt, tiltFromPointer } from '../../src/features/apps-showcase/lib/phone-tilt';

describe('phone-tilt', () => {
  it('maps the stage centre to the origin', () => {
    const rect = { left: 0, top: 0, width: 200, height: 100 } as DOMRect;
    expect(pointerToUnit({ x: 100, y: 50 }, rect)).toEqual({ x: 0, y: 0 });
  });

  it('tilts toward the pointer from the rest pose', () => {
    const rest = restTilt();
    expect(tiltFromPointer({ x: 1, y: 0 }).yaw).toBeGreaterThan(rest.yaw);
    expect(tiltFromPointer({ x: 0, y: 1 }).pitch).toBeLessThan(rest.pitch);
  });
});
