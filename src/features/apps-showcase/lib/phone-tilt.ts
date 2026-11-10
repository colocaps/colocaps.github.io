export interface UnitPointer {
  x: number;
  y: number;
}

export interface PhoneTilt {
  yaw: number;
  pitch: number;
}

const MAX_YAW = 0.42;
const MAX_PITCH = 0.22;
const REST: PhoneTilt = { yaw: -0.12, pitch: 0.06 };

/** Map a pointer inside a stage rect to −1…1 (centre = 0). */
export function pointerToUnit(pointer: { x: number; y: number }, rect: DOMRect): UnitPointer {
  const x = ((pointer.x - rect.left) / rect.width) * 2 - 1;
  const y = ((pointer.y - rect.top) / rect.height) * 2 - 1;
  return {
    x: Math.max(-1, Math.min(1, x)),
    y: Math.max(-1, Math.min(1, y)),
  };
}

/** Mild rest pose when the pointer is idle. */
export function restTilt(): PhoneTilt {
  return REST;
}

/** Tilt the phone toward the pointer (y inverted for Three.js). */
export function tiltFromPointer(unit: UnitPointer): PhoneTilt {
  return {
    yaw: REST.yaw + unit.x * MAX_YAW,
    pitch: REST.pitch - unit.y * MAX_PITCH,
  };
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}
