import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { AvatarFrame } from '../../../shared/ui/avatar-frame';
import { pointerToUnit, type UnitPointer } from '../lib/gaze';
import { AvatarHead } from './avatar-head';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

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
  interacting,
  reducedMotion,
}: {
  textureUrl: string;
  pointer: React.RefObject<UnitPointer>;
  interacting: React.RefObject<boolean>;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      className="size-full touch-none"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.1], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <AvatarHead
          textureUrl={textureUrl}
          pointer={pointer}
          interacting={interacting}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
}

function canCreateWebGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** WebGL portrait on every viewport: follows pointer/touch, idle sway when resting. */
export function Avatar3D({ textureUrl, alt }: Avatar3DProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<UnitPointer>({ x: 0, y: 0 });
  const interacting = useRef(false);
  const [mode, setMode] = useState<'pending' | '3d' | 'static'>('pending');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(REDUCED_MOTION).matches;
    setReducedMotion(reduce);
    setMode(canCreateWebGl() ? '3d' : 'static');
  }, []);

  useEffect(() => {
    if (mode !== '3d') return;
    const stage = stageRef.current;
    if (!stage) return;

    const setFromEvent = (event: PointerEvent) => {
      pointer.current = pointerToUnit({ x: event.clientX, y: event.clientY }, stage.getBoundingClientRect());
      interacting.current = true;
    };
    const end = () => {
      interacting.current = false;
      pointer.current = { x: 0, y: 0 };
    };

    stage.addEventListener('pointerdown', setFromEvent);
    stage.addEventListener('pointermove', setFromEvent);
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('pointerleave', end);
    return () => {
      stage.removeEventListener('pointerdown', setFromEvent);
      stage.removeEventListener('pointermove', setFromEvent);
      stage.removeEventListener('pointerup', end);
      stage.removeEventListener('pointercancel', end);
      stage.removeEventListener('pointerleave', end);
    };
  }, [mode]);

  if (mode !== '3d') {
    return <StaticAvatar textureUrl={textureUrl} alt={alt} />;
  }

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={alt}
      className="size-56 sm:size-avatar overflow-hidden rounded-full border-3 border-mist/15 shadow-avatar bg-ink-2"
    >
      <Scene
        textureUrl={textureUrl}
        pointer={pointer}
        interacting={interacting}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
