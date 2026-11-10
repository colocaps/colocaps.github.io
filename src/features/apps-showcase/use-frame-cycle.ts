import { useCallback, useEffect, useState } from 'react';

const FRAME_INTERVAL_MS = 2400;

/** Steps through `frameCount` frames while `playing`; resets to the first frame when it stops. */
export function useFrameCycle(frameCount: number, playing: boolean) {
  const [frameIndex, setFrameIndex] = useState(0);

  const advance = useCallback(() => setFrameIndex((index) => (index + 1) % frameCount), [frameCount]);

  useEffect(() => {
    if (!playing) {
      setFrameIndex(0);
      return;
    }
    if (frameCount < 2) return;
    const timer = setInterval(advance, FRAME_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [playing, frameCount, advance]);

  return { frameIndex, advance };
}
