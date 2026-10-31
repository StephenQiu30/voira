import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  characters,
  poses,
} from "../src/features/character-stage/characters.ts";
import { fill } from "../src/i18n/format.ts";
import {
  defaultLocale,
  localeFromPathname,
  negotiateLocale,
  withLocale,
} from "../src/i18n/locales.ts";

const dictionaries = {
  "zh-CN": JSON.parse(
    readFileSync(
      new URL("../src/i18n/dictionaries/zh-CN.json", import.meta.url),
      "utf8",
    ),
  ),
  en: JSON.parse(
    readFileSync(
      new URL("../src/i18n/dictionaries/en.json", import.meta.url),
      "utf8",
    ),
  ),
};

function leaves(value, prefix = "") {
  if (Array.isArray(value))
    return value.map((_, index) => `${prefix}[${index}]`);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      leaves(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

test("browser language selects a supported locale and an explicit choice wins", () => {
  assert.equal(negotiateLocale(null, undefined), defaultLocale);
  assert.equal(negotiateLocale("fr-FR,fr;q=0.9", undefined), "zh-CN");
  assert.equal(negotiateLocale("en-US,en;q=0.9,zh-CN;q=0.8", undefined), "en");
  assert.equal(negotiateLocale("zh-TW,zh;q=0.9,en;q=0.8", undefined), "zh-CN");
  assert.equal(negotiateLocale("fr;q=0.9,en;q=0.4", undefined), "en");
  assert.equal(negotiateLocale("zh-CN,zh;q=0.9", "en"), "en");
  assert.equal(negotiateLocale("en-GB", "nope"), "en");
});

test("locale routes stay on the selected language and bare paths gain a prefix", () => {
  assert.equal(localeFromPathname("/zh-CN"), "zh-CN");
  assert.equal(localeFromPathname("/en/room"), "en");
  assert.equal(localeFromPathname("/"), null);
  assert.equal(withLocale("/", "en"), "/en");
  assert.equal(withLocale("/zh-CN", "en"), "/en");
  assert.equal(withLocale("/en/room", "zh-CN"), "/zh-CN/room");
  assert.equal(
    fill("{name}，{state}", { name: "Kimi", state: "自然陪伴" }),
    "Kimi，自然陪伴",
  );
});

test("both dictionaries cover the same copy and every character state", () => {
  assert.deepEqual(leaves(dictionaries.en), leaves(dictionaries["zh-CN"]));
  for (const locale of ["zh-CN", "en"]) {
    const dictionary = dictionaries[locale];
    assert.deepEqual(
      Object.keys(dictionary.characters),
      characters.map((item) => item.id),
    );
    assert.deepEqual(
      Object.keys(dictionary.stage.poses),
      poses.map((item) => item.id),
    );
    for (const character of characters) {
      const profile = dictionary.characters[character.id];
      assert.ok(
        profile.name &&
          profile.shortName &&
          profile.tagline &&
          profile.description,
      );
      assert.ok(profile.traits.length > 0);
    }
  }
});
