import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { lerp, restTilt, tiltFromPointer, type UnitPointer } from '../lib/phone-tilt';

export interface PhoneScreenShot {
  src: string;
  frames: readonly number[];
  frameWidth: number;
  frameIndex: number;
}

interface IphoneMeshProps {
  shot: PhoneScreenShot;
  pointer: React.RefObject<UnitPointer>;
  interacting: React.RefObject<boolean>;
  reducedMotion: boolean;
}

const BODY = '#1c1c1e';
const FRAME = '#0a0a0a';

/** Low-poly iPhone: body + screen; tilts toward the pointer instead of spinning. */
export function IphoneMesh({ shot, pointer, interacting, reducedMotion }: IphoneMeshProps) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture(shot.src);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
  }, [texture]);

  useEffect(() => {
    const left = shot.frames[shot.frameIndex] ?? shot.frames[0] ?? 0;
    texture.offset.set(left / 100, 0);
    texture.repeat.set(shot.frameWidth / 100, 1);
    texture.needsUpdate = true;
  }, [shot.frameIndex, shot.frameWidth, shot.frames, texture]);

  useFrame(() => {
    if (!group.current) return;
    const target = reducedMotion || !interacting.current
      ? restTilt()
      : tiltFromPointer(pointer.current ?? { x: 0, y: 0 });
    group.current.rotation.y = lerp(group.current.rotation.y, target.yaw, 0.12);
    group.current.rotation.x = lerp(group.current.rotation.x, target.pitch, 0.12);
    group.current.rotation.z = lerp(group.current.rotation.z, 0, 0.12);
  });

  return (
    <group ref={group} rotation={[restTilt().pitch, restTilt().yaw, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.18, 2.42, 0.14]} />
        <meshStandardMaterial color={BODY} roughness={0.35} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.072]}>
        <boxGeometry args={[1.1, 2.32, 0.02]} />
        <meshStandardMaterial color={FRAME} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.086]}>
        <planeGeometry args={[1.0, 2.16]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.92, 0.095]}>
        <boxGeometry args={[0.28, 0.08, 0.02]} />
        <meshStandardMaterial color="#050505" roughness={0.4} />
      </mesh>
      <mesh position={[0.6, 0.35, 0]}>
        <boxGeometry args={[0.03, 0.22, 0.05]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.6, 0.45, 0]}>
        <boxGeometry args={[0.03, 0.12, 0.05]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.6, 0.25, 0]}>
        <boxGeometry args={[0.03, 0.12, 0.05]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}
