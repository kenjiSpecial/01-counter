export type GameState = 'IDLE' | 'PLAYING' | 'FINISHED';

export interface ExplosionData {
  id: number;
  pos: [number, number, number];
  color: string;
}

