/** 中心 (x, y)・半径 r の四方に尖った星(✦)の SVG パス */
export const sparkPath = (x: number, y: number, r: number): string =>
  `M${x},${y - r} Q${x},${y} ${x + r},${y} Q${x},${y} ${x},${y + r} Q${x},${y} ${x - r},${y} Q${x},${y} ${x},${y - r}Z`;
