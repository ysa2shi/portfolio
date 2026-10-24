import { MAP_SIZE, edges, skills } from "@/config/skills";
import { sparkPath } from "@/utils/sparkle";

// 星図(SkillsSection)の見た目に使う座標の計算。データそのものは src/config/skills.ts

// 背景の星。ビルドごとに配置が変わらないよう、固定の乱数で作る
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const rand = mulberry32(20261024);
export const bgStars = Array.from({ length: 70 }, () => ({
  cx: Math.round(rand() * MAP_SIZE.width),
  cy: Math.round(rand() * MAP_SIZE.height),
  r: +(rand() * 1.3 + 0.4).toFixed(2),
  delay: +(rand() * 4).toFixed(2),
}));

// 星図の隅で瞬く飾りの星: [x, y, 半径]
export const sparks = (
  [
    [90, 60, 9],
    [930, 90, 12],
    [610, 40, 7],
    [60, 470, 8],
    [960, 520, 10],
    [400, 540, 7],
  ] as const
).map(([x, y, r], i) => ({ d: sparkPath(x, y, r), delay: i * 0.8 }));

// つながりの線は、少し湾曲させて有機的に見せる
const byId = new Map(skills.map((s) => [s.id, s]));
export const edgePaths = edges.map(({ a, b }, i) => {
  const A = byId.get(a)!;
  const B = byId.get(b)!;
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len = Math.hypot(dx, dy);
  const off = (i % 2 ? 1 : -1) * len * 0.06;
  const mx = (A.x + B.x) / 2 - (dy / len) * off;
  const my = (A.y + B.y) / 2 + (dx / len) * off;
  return { a, b, i, d: `M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}` };
});
