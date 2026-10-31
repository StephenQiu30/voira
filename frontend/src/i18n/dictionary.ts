import type {
  CharacterId,
  PoseId,
} from "@/features/character-stage/characters";
import en from "./dictionaries/en.json";
import zhCN from "./dictionaries/zh-CN.json";
import type { Locale } from "./locales";

export type CharacterProfile = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  traits: string[];
};

export type Dictionary = {
  meta: { title: string; description: string };
  layout: {
    skip: string;
    brand: string;
    home: string;
    standby: string;
    roomClosed: string;
    generated: string;
    footerBrand: string;
    theme: string;
    switchLocale: string;
  };
  stage: {
    previous: string;
    next: string;
    roomTitle: string;
    roomBody: string;
    roomNote: string;
    poseLabel: string;
    shownAs: string;
    stateMissing: string;
    choose: string;
    start: string;
    preparing: string;
    disconnected: string;
    posesPreparing: string;
    posesReady: string;
    posesPartial: string;
    positionName: string;
    alt: string;
    portraitPreparing: string;
    waiting: string;
    loading: string;
    preparingNext: string;
    loadFailedRetained: string;
    loadFailed: string;
    retry: string;
    poses: Record<PoseId, string>;
  };
  characters: Record<CharacterId, CharacterProfile>;
};

const dictionaries = {
  "zh-CN": zhCN,
  en,
} satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
