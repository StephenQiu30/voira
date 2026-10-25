export const poses = [
  { id: "natural", label: "自然坐姿", directory: "01-natural" },
  { id: "crossed", label: "翘腿坐姿", directory: "02-crossed" },
  { id: "leaning", label: "侧斜坐姿", directory: "03-leaning" },
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
    tagline: "把每一个好奇，都变成新发现。",
    description:
      "跟着你的灵感一起出发。无论是天马行空的想法，还是日常里的小发现，都值得聊一聊。",
    traits: ["好奇活泼", "灵感丰富", "爱探索"],
  },
  {
    id: "claude",
    name: "Claude",
    shortName: "Claude",
    tagline: "认真听，也细腻地回应。",
    description:
      "把复杂的思绪慢慢展开，陪你找到清晰的表达。温和而从容，让对话有自己的节奏。",
    traits: ["细腻体贴", "从容认真", "善于倾听"],
  },
  {
    id: "grok",
    name: "Grok",
    shortName: "Grok",
    tagline: "一点直率，一点意想不到。",
    description:
      "用新鲜的角度打开话题，在认真之间留一点幽默。让每一次交流，都多一些轻松和趣味。",
    traits: ["直率坦诚", "幽默风趣", "不拘一格"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    shortName: "ChatGPT",
    tagline: "让纷繁的想法，慢慢变清晰。",
    description:
      "从一个小问题聊起，一起梳理想法、寻找可能。清晰而亲切，陪你把思路向前推进。",
    traits: ["清晰亲切", "耐心细致", "思路开阔"],
  },
] as const;
export type Character = (typeof characters)[number];
// White-background source masters stay intact; the stage uses the transparent Figma baseline.
export function portraitSource(id: Character["id"], pose: PoseId) {
  if (id === "deepseek") return `/characters/stage/deepseek-${pose}.png`;
  return `/characters/${poses.find((item) => item.id === pose)!.directory}/${id}.png`;
}
