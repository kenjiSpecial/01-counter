'use client';

import { motion } from 'framer-motion';
import type { GameState } from '../types/game';

interface GameUIProps {
  gameState: GameState;
  score: number;
  timeLeft: number;
  onStartGame: () => void;
}

export function GameUI({ gameState, score, timeLeft, onStartGame }: GameUIProps) {
  const handleShare = () => {
    const text = `I scored ${score} points in Hyper Clicker! #R3F #Threejs`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
      {/* ヘッダー情報 */}
      <div className="absolute top-10 w-full px-10 flex justify-between text-3xl font-bold font-mono">
        <div className={timeLeft < 3 ? 'text-red-500 animate-pulse' : 'text-white'}>
          TIME: {timeLeft.toFixed(1)}
        </div>
        <div>SCORE: {score}</div>
      </div>

      {/* ゲーム開始画面 */}
      {gameState === 'IDLE' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center pointer-events-auto"
        >
          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            HYPER CLICKER
          </h1>
          <p className="mb-6 text-gray-300">10秒間にできるだけ多く叩け！</p>
          <button
            onClick={onStartGame}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            GAME START
          </button>
        </motion.div>
      )}

      {/* リザルト画面 */}
      {gameState === 'FINISHED' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-black/70 backdrop-blur-lg p-10 rounded-3xl border-2 border-yellow-400/50 text-center pointer-events-auto"
        >
          <h2 className="text-4xl font-bold mb-2 text-yellow-400">TIME UP!</h2>
          <div className="text-8xl font-black my-4">{score}</div>
          <p className="text-xl text-gray-300 mb-8">Clicks in 10 seconds</p>

          <div className="space-x-4">
            <button
              onClick={onStartGame}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
            >
              RETRY
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-black border border-gray-600 hover:bg-gray-800 text-white font-bold rounded-lg transition-colors"
            >
              SHARE X
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

