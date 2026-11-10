import { ContactShadows, PresentationControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import type { AppId } from '../../../shared/media/app-shots';
import type { ShowcaseApp } from './showcase-app';
import { IphoneMesh } from './iphone-mesh';

interface Phone3DProps {
  apps: ShowcaseApp[];
  storeLabel: string;
  interactionHint: string;
  dragHint: string;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const FRAME_MS = 2800;

function PhoneCanvas({
  shot,
  autoRotate,
}: {
  shot: ShowcaseApp['shot'] & { frameIndex: number };
  autoRotate: boolean;
}) {
  return (
    <Canvas
      className="h-[min(70vh,560px)] w-full touch-none"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0b0f14']} />
      <ambientLight intensity={0.65} />
      <spotLight position={[4, 6, 4]} angle={0.4} penumbra={0.7} intensity={2} castShadow />
      <pointLight position={[-3, -2, 2]} intensity={0.7} color="#3ee0b7" />
      <Suspense fallback={null}>
        <PresentationControls
          global
          cursor
          snap
          speed={1.2}
          zoom={1}
          polar={[-0.35, 0.45]}
          azimuth={[-0.9, 0.9]}
        >
          <IphoneMesh
            shot={{
              src: shot.src,
              frames: shot.frames,
              frameWidth: shot.frameWidth,
              frameIndex: shot.frameIndex,
            }}
            autoRotate={autoRotate}
          />
        </PresentationControls>
        <ContactShadows position={[0, -1.55, 0]} opacity={0.45} scale={8} blur={2.4} far={4} />
      </Suspense>
    </Canvas>
  );
}

/** Interactive 3D phone: drag to orbit, pick an app, auto-cycle screenshot frames. */
export function Phone3D({ apps, storeLabel, interactionHint, dragHint }: Phone3DProps) {
  const [activeId, setActiveId] = useState<AppId>(apps[0]?.id ?? 'ueno-bank');
  const [frameIndex, setFrameIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const active = apps.find((app) => app.id === activeId) ?? apps[0];

  useEffect(() => {
    setReducedMotion(window.matchMedia(REDUCED_MOTION).matches);
  }, []);

  useEffect(() => {
    setFrameIndex(0);
  }, [activeId]);

  useEffect(() => {
    if (!active || reducedMotion || active.shot.frames.length <= 1) return;
    const id = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % active.shot.frames.length);
    }, FRAME_MS);
    return () => window.clearInterval(id);
  }, [active, reducedMotion]);

  if (!active) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-2/80"
        onPointerDown={() => setAutoRotate(false)}
        onPointerUp={() => setAutoRotate(true)}
      >
        <PhoneCanvas
          shot={{ ...active.shot, frameIndex }}
          autoRotate={autoRotate && !reducedMotion}
        />
        <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-muted">
          {dragHint}
        </p>
      </div>

      <div>
        <ul className="flex flex-col gap-3">
          {apps.map((app) => {
            const selected = app.id === activeId;
            return (
              <li key={app.id}>
                <div
                  className={`rounded-2xl border px-4 py-4 transition ${
                    selected
                      ? 'border-accent/50 bg-accent/10 shadow-[0_0_0_1px_rgba(62,224,183,0.25)]'
                      : 'border-line bg-transparent hover:border-mist/25 hover:bg-white/3'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(app.id)}
                    aria-pressed={selected}
                    className="w-full cursor-pointer text-left"
                  >
                    <h3 className="font-display text-xl font-bold tracking-tight">{app.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{app.blurb}</p>
                  </button>
                  {app.storeHref && (
                    <a
                      href={app.storeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      {storeLabel} ↗
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-xs text-muted">{interactionHint}</p>
      </div>
    </div>
  );
}
