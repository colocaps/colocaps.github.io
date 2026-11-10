import { getImage } from 'astro:assets';
import { appShots, type AppId } from './app-shots';

const SHOT_WIDTH = 1024;

export interface ResolvedShot {
  src: string;
  width: number;
  height: number;
  frames: readonly number[];
  frameWidth: number;
}

export async function resolveShot(id: AppId): Promise<ResolvedShot> {
  const { image, frames, frameWidth } = appShots[id];
  const optimized = await getImage({ src: image, width: SHOT_WIDTH, format: 'webp' });
  const { width = SHOT_WIDTH, height = image.height } = optimized.attributes;
  return { src: optimized.src, width: Number(width), height: Number(height), frames, frameWidth };
}
