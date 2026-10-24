/**
 * スキルの星図のデータ。追加・変更はこのファイルだけで行う。
 *
 * - tier: 1=主戦力 / 2=実務で使用 / 3=試している
 * - x, y: 星図(1000 x 560)上の座標
 * - links: つながり。同じ組を両側に書かず、片方の星にだけ1本書く
 * - 星座に載せるのは約20個まで(見やすさのため)
 *
 * 内容が不正なときはビルド時に例外を投げる。
 */
export const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Infra",
  "Tools",
] as const;
export type Category = (typeof CATEGORIES)[number];
export type Tier = 1 | 2 | 3;

export const TIER_LABELS: Record<Tier, string> = {
  1: "主戦力",
  2: "実務で使用",
  3: "試している",
};

export const MAP_SIZE = { width: 1000, height: 560 } as const;
const MAX_SKILLS = 20;

interface SkillInput {
  id: string;
  name: string;
  category: Category;
  tier: Tier;
  x: number;
  y: number;
  links?: string[];
}

const skillInputs: SkillInput[] = [
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    tier: 1,
    x: 220,
    y: 140,
    links: ["astro", "react", "vue"],
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    tier: 2,
    x: 110,
    y: 235,
    links: ["tailwind"],
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "Frontend",
    tier: 2,
    x: 300,
    y: 255,
    links: ["tailwind"],
  },
  {
    id: "astro",
    name: "Astro",
    category: "Frontend",
    tier: 3,
    x: 410,
    y: 115,
    links: ["tailwind", "cloudflare"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    tier: 2,
    x: 195,
    y: 345,
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "Infra",
    tier: 3,
    x: 545,
    y: 205,
    links: ["github-actions"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "Tools",
    tier: 2,
    x: 705,
    y: 120,
    links: ["github-actions"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "Tools",
    tier: 1,
    x: 695,
    y: 255,
    links: ["docker"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Infra",
    tier: 2,
    x: 480,
    y: 355,
    links: ["aws", "spring-boot"],
  },
  {
    id: "aws",
    name: "AWS",
    category: "Infra",
    tier: 1,
    x: 330,
    y: 450,
    links: ["dynamodb"],
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    category: "Database",
    tier: 2,
    x: 470,
    y: 500,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    tier: 2,
    x: 610,
    y: 470,
    links: ["dynamodb"],
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    category: "Backend",
    tier: 1,
    x: 745,
    y: 400,
    links: ["mysql"],
  },
  {
    id: "java",
    name: "Java",
    category: "Backend",
    tier: 2,
    x: 880,
    y: 320,
    links: ["spring-boot", "kotlin"],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "Backend",
    tier: 1,
    x: 890,
    y: 450,
    links: ["ktor", "spring-boot"],
  },
  {
    id: "ktor",
    name: "Ktor",
    category: "Backend",
    tier: 2,
    x: 790,
    y: 515,
    links: ["dynamodb"],
  },
];

export interface Skill extends Required<Omit<SkillInput, "links">> {
  /** 双方向のつながり(id)。links を両側に展開したもの */
  neighbors: string[];
}

export interface Edge {
  a: string;
  b: string;
}

function build() {
  const errors: string[] = [];
  const ids = new Set<string>();

  if (skillInputs.length > MAX_SKILLS) {
    errors.push(`スキルは${MAX_SKILLS}個までです(現在${skillInputs.length}個)`);
  }
  for (const s of skillInputs) {
    if (ids.has(s.id)) errors.push(`id が重複しています: ${s.id}`);
    ids.add(s.id);
    if (s.x < 0 || s.x > MAP_SIZE.width || s.y < 0 || s.y > MAP_SIZE.height) {
      errors.push(`座標が星図の範囲外です: ${s.id} (${s.x}, ${s.y})`);
    }
  }

  const edges: Edge[] = [];
  const pairs = new Set<string>();
  for (const s of skillInputs) {
    for (const t of s.links ?? []) {
      const key = [s.id, t].sort().join("|");
      if (!ids.has(t))
        errors.push(`links の参照先がありません: ${s.id} -> ${t}`);
      else if (t === s.id) errors.push(`自分自身へのつながりです: ${s.id}`);
      else if (pairs.has(key)) {
        errors.push(`つながりが重複しています(片方にだけ書く): ${s.id} - ${t}`);
      } else {
        pairs.add(key);
        edges.push({ a: s.id, b: t });
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `skills.ts の検証に失敗しました:\n- ${errors.join("\n- ")}`,
    );
  }

  const neighbors = new Map<string, string[]>(
    skillInputs.map((s) => [s.id, []]),
  );
  for (const { a, b } of edges) {
    neighbors.get(a)!.push(b);
    neighbors.get(b)!.push(a);
  }

  const skills: Skill[] = skillInputs.map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    tier: s.tier,
    x: s.x,
    y: s.y,
    neighbors: neighbors.get(s.id)!,
  }));
  return { skills, edges };
}

export const { skills, edges } = build();
