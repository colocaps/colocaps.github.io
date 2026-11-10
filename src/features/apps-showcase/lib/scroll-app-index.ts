/** Map 0…1 scroll progress through the sticky track to an app index. */
export function appIndexFromProgress(progress: number, count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 0;
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.min(count - 1, Math.floor(clamped * count));
}
