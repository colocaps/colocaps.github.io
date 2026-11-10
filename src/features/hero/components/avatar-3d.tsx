import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { AvatarFrame } from '../../../shared/ui/avatar-frame';
import { pointerToUnit, type UnitPointer } from '../lib/gaze';
import { AvatarHead } from './avatar-head';

const DESKTOP_POINTER = '(pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const DESKTOP_WIDTH = '(min-width: 64em)';

interface Avatar3DProps {
  textureUrl: string;
  alt: string;
}

function StaticAvatar({ textureUrl, alt }: Avatar3DProps) {
  return (
    <AvatarFrame>
      <img src={textureUrl} alt={alt} width={560} height={560} className="size-full object-cover object-top" />
    </AvatarFrame>
  );
}

function Scene({
  textureUrl,
  pointer,
  reducedMotion,
}: {
  textureUrl: string;
  pointer: React.RefObject<UnitPointer>;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      className="size-full"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.1], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <AvatarHead textureUrl={textureUrl} pointer={pointer} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

/** Desktop WebGL portrait that looks toward the pointer; static circular photo elsewhere. */
export function Avatar3D({ textureUrl, alt }: Avatar3DProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<UnitPointer>({ x: 0, y: 0 });
  const [mode, setMode] = useState<'static' | '3d'>('static');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia(DESKTOP_POINTER).matches;
    const wide = window.matchMedia(DESKTOP_WIDTH).matches;
    const reduce = window.matchMedia(REDUCED_MOTION).matches;
    setReducedMotion(reduce);
    setMode(fine && wide && !reduce ? '3d' : 'static');
  }, []);

  useEffect(() => {
    if (mode !== '3d') return;
    const stage = stageRef.current;
    if (!stage) return;

    const move = (event: PointerEvent) => {
      pointer.current = pointerToUnit({ x: event.clientX, y: event.clientY }, stage.getBoundingClientRect());
    };
    const rest = () => {
      pointer.current = { x: 0, y: 0 };
    };

    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerleave', rest);
    return () => {
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerleave', rest);
    };
  }, [mode]);

  if (mode === 'static') {
    return <StaticAvatar textureUrl={textureUrl} alt={alt} />;
  }

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={alt}
      className="size-56 sm:size-avatar overflow-hidden rounded-full border-3 border-mist/15 shadow-avatar bg-ink-2"
    >
      <Scene textureUrl={textureUrl} pointer={pointer} reducedMotion={reducedMotion} />
    </div>
  );
}
