import type { CSSProperties } from 'react';

export interface PhoneScreenProps {
  src: string;
  imageWidth: number;
  imageHeight: number;
  frames: readonly number[];
  frameWidth: number;
  frameIndex?: number;
  alt: string;
  highlighted?: boolean;
  className?: string;
}

const PERCENT = 100;
// Store screenshots carry a dark margin around each panel; a slight zoom crops it out of the bezel.
const ZOOM = 1.06;

/** A device window onto a store-screenshot strip: shows frame `frameIndex` and pans between frames. */
export function PhoneScreen({
  src,
  imageWidth,
  imageHeight,
  frames,
  frameWidth,
  frameIndex = 0,
  alt,
  highlighted = false,
  className = '',
}: PhoneScreenProps) {
  const frameLeft = frames[frameIndex] ?? frames[0] ?? 0;
  const left = frameLeft + (frameWidth * (1 - 1 / ZOOM)) / 2;
  const windowStyle: CSSProperties = { aspectRatio: `${(frameWidth / PERCENT) * imageWidth} / ${imageHeight}` };
  const imageStyle: CSSProperties = {
    width: `${(PERCENT / frameWidth) * PERCENT * ZOOM}%`,
    height: `${PERCENT * ZOOM}%`,
    top: `${((1 - ZOOM) / 2) * PERCENT}%`,
    transform: `translateX(-${left}%)`,
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-bezel-sm border-3 bg-ink-2 shadow-phone transition-colors duration-300 ${highlighted ? 'border-accent/60' : 'border-mist/15'} ${className}`}
      style={windowStyle}
    >
      <img
        src={src}
        width={imageWidth}
        height={imageHeight}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute left-0 max-w-none transition-transform duration-700 ease-out"
        style={imageStyle}
      />
    </div>
  );
}
