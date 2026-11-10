export interface UnitPointer {
  x: number;
  y: number;
}

export interface GazeRotation {
  yaw: number;
  pitch: number;
}

const MAX_YAW = 0.55;
const MAX_PITCH = 0.35;
const IDLE_YAW = 0.28;
const IDLE_PITCH = 0.1;

/** Map a pointer inside a stage rect to −1…1 (centre = 0). */
export function pointerToUnit(pointer: { x: number; y: number }, rect: DOMRect): UnitPointer {
  const x = ((pointer.x - rect.left) / rect.width) * 2 - 1;
  const y = ((pointer.y - rect.top) / rect.height) * 2 - 1;
  return {
    x: Math.max(-1, Math.min(1, x)),
    y: Math.max(-1, Math.min(1, y)),
  };
}

/** Head yaw/pitch that turns toward the pointer (y inverted for Three.js). */
export function gazeFromPointer(unit: UnitPointer): GazeRotation {
  return {
    yaw: unit.x * MAX_YAW,
    pitch: -unit.y * MAX_PITCH,
  };
}

/** Gentle idle look when there is no active pointer (mobile / resting desktop). */
export function idleGaze(elapsedSeconds: number): GazeRotation {
  return {
    yaw: Math.sin(elapsedSeconds * 0.7) * IDLE_YAW,
    pitch: Math.sin(elapsedSeconds * 0.45) * IDLE_PITCH,
  };
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}
