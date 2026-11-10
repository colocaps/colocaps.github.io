import { ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { appIndexFromProgress } from '../lib/scroll-app-index';
import { pointerToUnit, type UnitPointer } from '../lib/phone-tilt';
import { IphoneMesh } from './iphone-mesh';
import type { ShowcaseApp } from './showcase-app';

interface ScrollPhoneShowcaseProps {
  apps: ShowcaseApp[];
  storeLabel: string;
  interactionHint: string;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const PANEL_VH = 100;
/** iPhone 16 logical points — large but fully framed in the canvas. */
const IPHONE_WIDTH_PX = 360;
const IPHONE_HEIGHT_PX = 780;

function PhoneCanvas({
  shot,
  pointer,
  interacting,
  reducedMotion,
}: {
  shot: ShowcaseApp['shot'] & { frameIndex: number };
  pointer: React.RefObject<UnitPointer>;
  interacting: React.RefObject<boolean>;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      // Far enough that the full 2.42-unit phone fits with margin (was cropped at z≈3.5).
      camera={{ position: [0, 0, 5.6], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.75} />
      <spotLight position={[3.5, 5, 4]} angle={0.4} penumbra={0.7} intensity={2.1} castShadow />
      <pointLight position={[-2.5, -1.5, 2]} intensity={0.75} color="#3ee0b7" />
      <Suspense fallback={null}>
        <IphoneMesh
          key={shot.src}
          shot={{
            src: shot.src,
            frames: shot.frames,
            frameWidth: shot.frameWidth,
            frameIndex: shot.frameIndex,
          }}
          pointer={pointer}
          interacting={interacting}
          reducedMotion={reducedMotion}
        />
        <ContactShadows position={[0, -1.55, 0]} opacity={0.4} scale={8} blur={2.4} far={4} />
      </Suspense>
    </Canvas>
  );
}

/** Sticky centered phone: scroll advances apps; pointer tilts the device. */
export function ScrollPhoneShowcase({ apps, storeLabel, interactionHint }: ScrollPhoneShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<UnitPointer>({ x: 0, y: 0 });
  const interacting = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

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
      setActiveIndex(appIndexFromProgress(progress, apps.length));
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
    const stage = stageRef.current;
    if (!stage || reducedMotion) return;

    const move = (event: PointerEvent) => {
      pointer.current = pointerToUnit({ x: event.clientX, y: event.clientY }, stage.getBoundingClientRect());
      interacting.current = true;
    };
    const end = () => {
      interacting.current = false;
      pointer.current = { x: 0, y: 0 };
    };

    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerdown', move);
    stage.addEventListener('pointerleave', end);
    stage.addEventListener('pointercancel', end);
    return () => {
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerdown', move);
      stage.removeEventListener('pointerleave', end);
      stage.removeEventListener('pointercancel', end);
    };
  }, [reducedMotion]);

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
      <div
        ref={stageRef}
        className="sticky top-0 flex h-svh flex-col items-center justify-center px-4 sm:px-6"
      >
        <div className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center gap-3 py-3">
          <div
            className="relative shrink-0 overflow-visible"
            style={{
              width: `min(88vw, ${IPHONE_WIDTH_PX}px)`,
              maxHeight: '64svh',
              aspectRatio: `${IPHONE_WIDTH_PX} / ${IPHONE_HEIGHT_PX}`,
            }}
          >
            <PhoneCanvas
              shot={{ ...active.shot, frameIndex: 0 }}
              pointer={pointer}
              interacting={interacting}
              reducedMotion={reducedMotion}
            />
          </div>

          <div
            key={active.id}
            className="w-full max-w-md px-2 text-center motion-safe:animate-[fade-rise_420ms_ease-out]"
          >
            <p className="mb-1 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {activeIndex + 1} / {apps.length}
            </p>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{active.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{active.blurb}</p>
            {active.storeHref && (
              <a
                href={active.storeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                {storeLabel} ↗
              </a>
            )}
          </div>

          <ol className="flex max-w-xl flex-wrap items-center justify-center gap-2" aria-label={interactionHint}>
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

          <p className="text-center text-xs text-muted">{interactionHint}</p>
        </div>
      </div>
    </div>
  );
}
