import { ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { appIndexFromProgress } from '../lib/scroll-app-index';
import { IphoneMesh } from './iphone-mesh';
import type { ShowcaseApp } from './showcase-app';

interface ScrollPhoneShowcaseProps {
  apps: ShowcaseApp[];
  storeLabel: string;
  interactionHint: string;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const PANEL_VH = 100;

function PhoneCanvas({
  shot,
  autoRotate,
  spinBoost,
}: {
  shot: ShowcaseApp['shot'] & { frameIndex: number };
  autoRotate: boolean;
  spinBoost: number;
}) {
  return (
    <Canvas
      className="h-[min(62vh,520px)] w-full max-w-md"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.7} />
      <spotLight position={[4, 6, 4]} angle={0.4} penumbra={0.7} intensity={2} castShadow />
      <pointLight position={[-3, -2, 2]} intensity={0.7} color="#3ee0b7" />
      <Suspense fallback={null}>
        <IphoneMesh
          key={shot.src}
          shot={{
            src: shot.src,
            frames: shot.frames,
            frameWidth: shot.frameWidth,
            frameIndex: shot.frameIndex,
          }}
          autoRotate={autoRotate}
          spinBoost={spinBoost}
        />
        <ContactShadows position={[0, -1.55, 0]} opacity={0.4} scale={8} blur={2.4} far={4} />
      </Suspense>
    </Canvas>
  );
}

/** Sticky centered phone: scroll advances one app at a time onto the screen. */
export function ScrollPhoneShowcase({ apps, storeLabel, interactionHint }: ScrollPhoneShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [spinBoost, setSpinBoost] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const previousIndex = useRef(0);

  const active = apps[activeIndex] ?? apps[0];

  useEffect(() => {
    setReducedMotion(window.matchMedia(REDUCED_MOTION).matches);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const rect = track.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / range));
      const next = appIndexFromProgress(progress, apps.length);
      setActiveIndex(next);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [apps.length]);

  useEffect(() => {
    if (previousIndex.current === activeIndex) return;
    previousIndex.current = activeIndex;
    if (reducedMotion) return;
    setSpinBoost(1.8);
    const id = window.setTimeout(() => setSpinBoost(0), 700);
    return () => window.clearTimeout(id);
  }, [activeIndex, reducedMotion]);

  const scrollToApp = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const range = Math.max(1, track.offsetHeight - window.innerHeight);
    const target = absoluteTop + (index / apps.length) * range + 8;
    window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  if (!active) return null;

  return (
    <div
      ref={trackRef}
      className="relative -mx-6 md:-mx-12"
      style={{ height: `${apps.length * PANEL_VH}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div className="flex w-full max-w-3xl flex-col items-center">
          <PhoneCanvas
            shot={{ ...active.shot, frameIndex: 0 }}
            autoRotate={!reducedMotion}
            spinBoost={spinBoost}
          />

          <div
            key={active.id}
            className="mt-6 max-w-md text-center motion-safe:animate-[fade-rise_420ms_ease-out]"
          >
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {activeIndex + 1} / {apps.length}
            </p>
            <h3 className="font-display text-3xl font-bold tracking-tight">{active.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{active.blurb}</p>
            {active.storeHref && (
              <a
                href={active.storeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                {storeLabel} ↗
              </a>
            )}
          </div>

          <ol className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label={interactionHint}>
            {apps.map((app, index) => {
              const selected = index === activeIndex;
              return (
                <li key={app.id}>
                  <button
                    type="button"
                    aria-current={selected ? 'true' : undefined}
                    aria-label={app.name}
                    onClick={() => scrollToApp(index)}
                    className={`min-h-11 rounded-full px-3 text-sm font-semibold transition ${
                      selected
                        ? 'bg-accent text-accent-ink'
                        : 'border border-line text-muted hover:border-mist/30 hover:text-mist'
                    }`}
                  >
                    {app.name}
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="mt-4 text-center text-xs text-muted">{interactionHint}</p>
        </div>
      </div>
    </div>
  );
}
