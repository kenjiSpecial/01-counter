export const GAME_DURATION = 10;

// ランダムな色を生成
export const getRandomColor = () => {
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
  return colors[Math.floor(Math.random() * colors.length)];
};

