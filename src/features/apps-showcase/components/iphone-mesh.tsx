import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export interface PhoneScreenShot {
  src: string;
  frames: readonly number[];
  frameWidth: number;
  frameIndex: number;
}

interface IphoneMeshProps {
  shot: PhoneScreenShot;
  autoRotate: boolean;
}

const BODY = '#1c1c1e';
const FRAME = '#0a0a0a';

/** Low-poly iPhone: body, inset screen with UV window onto a store-screenshot strip. */
export function IphoneMesh({ shot, autoRotate }: IphoneMeshProps) {
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

  useFrame((_, delta) => {
    if (!group.current || !autoRotate) return;
    group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group} rotation={[0.12, -0.35, 0.04]}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.18, 2.42, 0.14]} />
        <meshStandardMaterial color={BODY} roughness={0.35} metalness={0.55} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0, 0.072]}>
        <boxGeometry args={[1.1, 2.32, 0.02]} />
        <meshStandardMaterial color={FRAME} roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.086]}>
        <planeGeometry args={[1.0, 2.16]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Dynamic Island */}
      <mesh position={[0, 0.92, 0.095]}>
        <boxGeometry args={[0.28, 0.08, 0.02]} />
        <meshStandardMaterial color="#050505" roughness={0.4} />
      </mesh>
      {/* Side button */}
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
