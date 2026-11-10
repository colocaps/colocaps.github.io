import type { ReactNode, Ref } from 'react';

type AvatarSize = 'md' | 'lg';

const sizeClass: Record<AvatarSize, string> = {
  md: 'size-44 sm:size-56',
  lg: 'size-56 sm:size-avatar',
};

interface AvatarFrameProps {
  size?: AvatarSize;
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children: ReactNode;
}

/** Circular portrait frame; renders its `<img>` child cover-fitted. */
export function AvatarFrame({ size = 'lg', ref, className = '', children }: AvatarFrameProps) {
  return (
    <div
      ref={ref}
      className={`${sizeClass[size]} overflow-hidden rounded-full border-3 border-mist/15 shadow-avatar [&_img]:size-full [&_img]:object-cover ${className}`}
    >
      {children}
    </div>
  );
}
