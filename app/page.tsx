'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { ClickTarget } from '../components/ClickTarget';
import { GameUI } from '../components/GameUI';
import { GAME_DURATION } from '../utils/constants';
import type { GameState } from '../types/game';

export default function ClickerGame() {
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  // タイマー処理
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'PLAYING') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            setGameState('FINISHED');
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('PLAYING');
  };

  const handleHit = () => {
    setScore((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white overflow-hidden select-none">
      {/* 3Dシーン (背景) */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />

          {/* 環境光と演出 */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* ゲームオブジェクト */}
          <ClickTarget isPlaying={gameState === 'PLAYING'} onHit={handleHit} />
        </Canvas>
      </div>

      {/* UIレイヤー (HUD) */}
      <GameUI
        gameState={gameState}
        score={score}
        timeLeft={timeLeft}
        onStartGame={startGame}
      />
    </div>
  );
}
