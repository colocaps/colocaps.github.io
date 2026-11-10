import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gazeFromPointer, lerp, type UnitPointer } from '../lib/gaze';

interface AvatarHeadProps {
  textureUrl: string;
  pointer: React.RefObject<UnitPointer>;
  reducedMotion: boolean;
}

/**
 * Photo mapped on a 3D disc. The whole head turns toward the pointer so the gaze
 * reads as looking at you; a key light tracks the same pointer for moving catchlights.
 */
export function AvatarHead({ textureUrl, pointer, reducedMotion }: AvatarHeadProps) {
  const group = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.SpotLight>(null);
  const texture = useTexture(textureUrl);
  const { viewport } = useThree();

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  useFrame((state) => {
    if (!group.current) return;
    if (reducedMotion) {
      group.current.rotation.set(0, 0, 0);
      group.current.position.y = 0;
      return;
    }

    const { yaw, pitch } = gazeFromPointer(pointer.current);
    group.current.rotation.y = lerp(group.current.rotation.y, yaw, 0.14);
    group.current.rotation.x = lerp(group.current.rotation.x, pitch, 0.14);
    group.current.position.y = lerp(
      group.current.position.y,
      Math.sin(state.clock.elapsedTime * 0.85) * 0.045,
      0.1,
    );

    if (keyLight.current) {
      keyLight.current.position.x = lerp(keyLight.current.position.x, pointer.current.x * 2.2, 0.12);
      keyLight.current.position.y = lerp(keyLight.current.position.y, 1.2 - pointer.current.y * 1.2, 0.12);
    }
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.4;

  return (
    <>
      <ambientLight intensity={0.55} />
      <spotLight
        ref={keyLight}
        position={[1.4, 1.6, 2.4]}
        angle={0.55}
        penumbra={0.6}
        intensity={2.2}
        color="#e8fff7"
        castShadow
      />
      <pointLight position={[-2.2, -0.4, 1.2]} intensity={0.55} color="#6ec8ff" />
      <group ref={group} scale={scale}>
        <mesh castShadow>
          <circleGeometry args={[1, 64]} />
          <meshStandardMaterial map={texture} roughness={0.5} metalness={0.04} />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[1.03, 64]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <ringGeometry args={[0.97, 1.05, 64]} />
          <meshBasicMaterial color="#3ee0b7" transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  );
}
