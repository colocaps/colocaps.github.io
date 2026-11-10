import type { ImageMetadata } from 'astro';
import merkao from '../../assets/apps/merkao.jpg';
import siglo21 from '../../assets/apps/siglo-21.jpg';
import uenoBank from '../../assets/apps/ueno-bank.jpg';
import uenoEmpresas from '../../assets/apps/ueno-empresas.jpg';
import vizagoPay from '../../assets/apps/vizago-pay.jpg';

export type AppId = 'ueno-bank' | 'ueno-empresas' | 'merkao' | 'vizago-pay' | 'siglo-21';

/**
 * The sources are store-screenshot strips. A shot describes the window onto the strip that makes
 * one "screen": `frames` are the left edges (percent of the image width) and `frameWidth` the
 * window width, so the phone can pan from one store screenshot to the next.
 */
export interface AppShot {
  image: ImageMetadata;
  frames: readonly number[];
  frameWidth: number;
}

export const appShots: Record<AppId, AppShot> = {
  'ueno-bank': { image: uenoBank, frames: [1.7, 26.4, 51.1, 75.8], frameWidth: 23 },
  'ueno-empresas': { image: uenoEmpresas, frames: [1.4, 26.4, 51.3, 76.2], frameWidth: 23.2 },
  merkao: { image: merkao, frames: [2.3, 27, 51.7, 76.3], frameWidth: 23 },
  'vizago-pay': { image: vizagoPay, frames: [58.9], frameWidth: 34.7 },
  'siglo-21': { image: siglo21, frames: [1.3, 26.1, 50.9, 75.7], frameWidth: 23.2 },
};
