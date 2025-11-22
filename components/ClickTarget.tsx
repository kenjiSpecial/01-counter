'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Explosion } from './Explosion';
import { getRandomColor } from '../utils/constants';
import type { ExplosionData } from '../types/game';

interface ClickTargetProps {
  isPlaying: boolean;
  onHit: () => void;
}

export function ClickTarget({ isPlaying, onHit }: ClickTargetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [color, setColor] = useState('#ffffff');
  const [scale, setScale] = useState(1);
  const [explosions, setExplosions] = useState<ExplosionData[]>([]);

  // アニメーションループ
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // スケールを元のサイズ(1.5)に戻す補間 (Lerp)
    const targetScale = isPlaying ? 1.5 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale * scale, targetScale * scale, targetScale * scale),
      0.2
    );

    // 待機中はゆっくり回転
    if (!isPlaying) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    } else {
      // ゲーム中は激しく動く
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
    }
  });

  const handleClick = () => {
    if (!isPlaying) return;

    const newColor = getRandomColor();
    setColor(newColor);
    setScale(0.8); // 一瞬縮む
    setTimeout(() => setScale(1.2), 50); // ビヨーンと伸びる

    // エフェクト追加
    const id = Date.now();
    setExplosions((prev) => [...prev.slice(-5), { id, pos: [0, 0, 0], color: newColor }]); // 最新5個だけ保持

    onHit();
  };

  return (
    <group>
      <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => (document.body.style.cursor = isPlaying ? 'pointer' : 'default')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            flatShading={true}
          />
        </mesh>
      </Float>

      {/* クリック時の爆発エフェクト描画 */}
      {explosions.map((exp) => (
        <Explosion key={exp.id} position={exp.pos} color={exp.color} />
      ))}
    </group>
  );
}

