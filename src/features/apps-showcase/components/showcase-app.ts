import type { AppId } from '../../../shared/media/app-shots';

export interface ShowcaseApp {
  id: AppId;
  name: string;
  blurb: string;
  screensAlt: string;
  storeHref?: string | undefined;
  shot: { src: string; width: number; height: number; frames: readonly number[]; frameWidth: number };
}
