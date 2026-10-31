export const poses = [
  { id: "natural" },
  { id: "listening" },
  { id: "casual" },
  { id: "playful" },
  { id: "thinking" },
] as const;
export type PoseId = (typeof poses)[number]["id"];
export const characters = [
  { id: "deepseek" },
  { id: "gemini" },
  { id: "claude" },
  { id: "grok" },
  { id: "chatgpt" },
  { id: "kimi" },
  { id: "qwen" },
] as const;
export type Character = (typeof characters)[number];
export type CharacterId = Character["id"];
export type Selection = { characterId: CharacterId; pose: PoseId };

// Explicit availability keeps unadopted candidates out of the live selector.
function adultPoses(
  id: Exclude<CharacterId, "deepseek" | "kimi" | "qwen">,
): Record<PoseId, string> {
  return {
    natural: `/characters/adult/${id}/master.png`,
    listening: `/characters/adult/${id}/listening.png`,
    casual: `/characters/adult/${id}/casual.png`,
    playful: `/characters/adult/${id}/playful.png`,
    thinking: `/characters/adult/${id}/thinking.png`,
  };
}
const portraits: Record<CharacterId, Partial<Record<PoseId, string>>> = {
  deepseek: {
    natural: "/characters/adult/deepseek/natural.png?v=63cec7bd",
    listening: "/characters/adult/deepseek/listening.png?v=84a399be",
    casual: "/characters/adult/deepseek/casual.png?v=763897ee",
    playful: "/characters/adult/deepseek/playful.png?v=8444d8ea",
    thinking: "/characters/adult/deepseek/thinking.png?v=24b6f458",
  },
  gemini: adultPoses("gemini"),
  claude: adultPoses("claude"),
  grok: adultPoses("grok"),
  chatgpt: adultPoses("chatgpt"),
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
