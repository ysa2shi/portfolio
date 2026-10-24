/**
 * スキルの星図のデータ。追加・変更はこのファイルだけで行う。
 *
 * - tier: 1=主戦力 / 2=実務で使用 / 3=個人開発でよく使う / 4=試している(表示名は SkillsSection.astro の tiers)
 * - x, y: 星図(1000 x 560)上の座標
 * - links: つながり。同じ組を両側に書かず、片方の星にだけ1本書く
 * - 星座に載せるのは約20個まで(見やすさのため。上限は MAX_SKILLS)
 *
 * 内容が不正なときはビルド時に例外を投げる。
 */
export const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Infra",
  "AI",
  "Tools",
] as const;
export type Category = (typeof CATEGORIES)[number];
export type Tier = 1 | 2 | 3 | 4;

export const MAP_SIZE = { width: 1000, height: 560 } as const;
const MAX_SKILLS = 22;

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
  // Frontend
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    tier: 2,
    x: 200,
    y: 140,
    links: ["nuxt", "astro"],
  },
  {
    id: "nuxt",
    name: "Nuxt",
    category: "Frontend",
    tier: 2,
    x: 100,
    y: 250,
  },
  {
    id: "astro",
    name: "Astro",
    category: "Frontend",
    tier: 3,
    x: 340,
    y: 90,
    links: ["tailwind", "cloudflare"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    tier: 3,
    x: 250,
    y: 290,
  },
  // Infra
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "Infra",
    tier: 3,
    x: 480,
    y: 190,
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "Infra",
    tier: 4,
    x: 650,
    y: 130,
  },
  {
    id: "aws",
    name: "AWS",
    category: "Infra",
    tier: 1,
    x: 570,
    y: 320,
    links: ["dynamodb"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Infra",
    tier: 2,
    x: 430,
    y: 390,
    links: ["aws", "gcp"],
  },
  // Backend
  {
    id: "java",
    name: "Java",
    category: "Backend",
    tier: 1,
    x: 830,
    y: 190,
    links: ["spring-boot"],
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    category: "Backend",
    tier: 1,
    x: 760,
    y: 320,
    links: ["mysql", "kafka", "docker"],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "Backend",
    tier: 4,
    x: 910,
    y: 330,
    links: ["ktor", "spring-boot"],
  },
  {
    id: "ktor",
    name: "Ktor",
    category: "Backend",
    tier: 4,
    x: 880,
    y: 470,
  },
  {
    id: "kafka",
    name: "Kafka",
    category: "Backend",
    tier: 2,
    x: 700,
    y: 460,
  },
  // Database
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    tier: 1,
    x: 540,
    y: 500,
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    category: "Database",
    tier: 2,
    x: 380,
    y: 500,
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Database",
    tier: 4,
    x: 240,
    y: 430,
  },
  // AI
  {
    id: "claude-code",
    name: "Claude Code",
    category: "AI",
    tier: 2,
    x: 90,
    y: 390,
  },
  {
    id: "codex",
    name: "Codex",
    category: "AI",
    tier: 2,
    x: 110,
    y: 500,
  },
  // Tools
  {
    id: "github",
    name: "GitHub",
    category: "Tools",
    tier: 1,
    x: 520,
    y: 50,
    links: ["github-actions"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "Tools",
    tier: 2,
    x: 360,
    y: 300,
    links: ["cloudflare"],
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
