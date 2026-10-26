export const poses = [
  { id: "natural", label: "自然陪伴" },
  { id: "listening", label: "认真倾听" },
  { id: "casual", label: "轻松闲聊" },
  { id: "playful", label: "俏皮回应" },
  { id: "thinking", label: "托腮思考" },
] as const;
export type PoseId = (typeof poses)[number]["id"];
export const characters = [
  {
    id: "deepseek",
    name: "蓝色大肥鱼",
    shortName: "大肥鱼",
    tagline: "温柔里，藏着一点小机灵。",
    description:
      "愿意听你慢慢说，再用轻松的话陪你理清思路。认真回应，也保留一点俏皮。",
    traits: ["温柔耐心", "轻松自然", "小机灵"],
  },
  {
    id: "gemini",
    name: "Gemini",
    shortName: "Gemini",
    tagline: "让好奇心，带你走远一点。",
    description: "总对新鲜事保持好奇。一个小问题，也能聊出几种意想不到的可能。",
    traits: ["好奇心", "想象力", "灵动"],
  },
  {
    id: "claude",
    name: "Claude",
    shortName: "Claude",
    tagline: "慢慢听，细细想。",
    description:
      "不急着给出答案，先把你的话听完整。用细腻的观察，陪你梳理复杂的想法。",
    traits: ["沉稳", "细腻", "克制"],
  },
  {
    id: "grok",
    name: "Grok",
    shortName: "Grok",
    tagline: "一点腹黑，让聊天更有趣。",
    description:
      "活泼里藏着一点腹黑，接话快，也爱抛出出其不意的观点。让日常聊天多一点趣味。",
    traits: ["腹黑", "活泼", "机智"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    shortName: "ChatGPT",
    tagline: "从容倾听，把想法说清楚。",
    description:
      "从容地接住不同想法，把纷杂的问题说得清楚。温和鼓励，也愿意与你一起推敲。",
    traits: ["从容", "知性", "包容"],
  },
  {
    id: "kimi",
    name: "Kimi",
    shortName: "Kimi",
    tagline: "把你的故事，认真记在心里。",
    description:
      "安静专注的夜读者，记得你提过的小事。用耐心的倾听和一点冷幽默，陪你把思绪写成故事。",
    traits: ["安静专注", "耐心细致", "冷幽默"],
  },
  {
    id: "qwen",
    name: "Qwen",
    shortName: "Qwen",
    tagline: "旧故事，也可以有新的讲法。",
    description:
      "温雅细致的书坊姑娘，珍惜旧故事，也愿意听见新的想法。把周到藏进日常，为意外留一点余地。",
    traits: ["温雅周到", "细致有礼", "有主见"],
  },
] as const;
export type Character = (typeof characters)[number];
export type CharacterId = Character["id"];
export type Selection = { characterId: CharacterId; pose: PoseId };

// Explicit availability keeps unadopted candidates out of the live selector.
const fivePoseSources = (id: CharacterId, revision?: string) => {
  const source = (directory: string) =>
    `/characters/${directory}/${id}.png${revision ? `?v=${revision}` : ""}`;
  return {
    natural: source("01-natural"),
    listening: source("02-listening"),
    casual: source("03-casual"),
    playful: source("04-playful"),
    thinking: source("05-thinking"),
  };
};
const portraits: Record<CharacterId, Partial<Record<PoseId, string>>> = {
  deepseek: {
    natural: "/characters/adult/deepseek/natural.png?v=63cec7bd",
    listening: "/characters/adult/deepseek/listening.png?v=84a399be",
    casual: "/characters/adult/deepseek/casual.png?v=763897ee",
    playful: "/characters/adult/deepseek/playful.png?v=8444d8ea",
    thinking: "/characters/adult/deepseek/thinking.png?v=24b6f458",
  },
  gemini: fivePoseSources("gemini"),
  claude: fivePoseSources("claude"),
  grok: fivePoseSources("grok"),
  chatgpt: fivePoseSources("chatgpt", "t121"),
  kimi: {},
  qwen: {},
};

export function portraitSource(id: CharacterId, pose: PoseId): string | null {
  return portraits[id][pose] ?? null;
}

export function selectCharacter(
  current: Selection,
  characterId: CharacterId,
): Selection {
  return {
    characterId,
    pose: portraitSource(characterId, current.pose) ? current.pose : "natural",
  };
}
