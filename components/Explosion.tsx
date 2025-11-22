'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExplosionProps {
  position: [number, number, number];
  color: string;
}

export function Explosion({ position, color }: ExplosionProps) {
  const groupRef = useRef<THREE.Group>(null);

  // パーティクルのデータ生成
  const particles = useMemo(() => {
    return new Array(8).fill(0).map(() => ({
      velocity: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ],
      scale: Math.random() * 0.2 + 0.1
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 爆発の拡散アニメーション
    groupRef.current.children.forEach((child, i) => {
      child.position.x += particles[i].velocity[0] * delta;
      child.position.y += particles[i].velocity[1] * delta;
      child.position.z += particles[i].velocity[2] * delta;
      child.scale.multiplyScalar(0.9); // 徐々に小さく
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, i) => (
        <mesh key={i} scale={[p.scale, p.scale, p.scale]}>
          <boxGeometry />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

