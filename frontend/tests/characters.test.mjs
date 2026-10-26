import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import {
  characters,
  poses,
  portraitSource,
  selectCharacter,
} from "../src/features/character-stage/characters.ts";

test("seven AI choices use the five approved state labels", () => {
  assert.equal(characters.length, 7);
  assert.equal(new Set(characters.map((item) => item.id)).size, 7);
  assert.deepEqual(
    poses.map((item) => item.label),
    ["自然陪伴", "认真倾听", "轻松闲聊", "俏皮回应", "托腮思考"],
  );
});

test("every enabled portrait resolves to an adopted public asset", () => {
  for (const character of characters) {
    for (const pose of poses) {
      const src = portraitSource(character.id, pose.id);
      if (src)
        assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), src);
    }
  }
});

test("the four completed characters expose all five states", () => {
  for (const id of ["gemini", "claude", "grok", "chatgpt"]) {
    const sources = poses.map((pose) => portraitSource(id, pose.id));
    assert.ok(sources.every(Boolean));
    assert.equal(new Set(sources).size, 5);
    assert.deepEqual(
      sources.map((src) => new URL(src, "http://localhost").pathname),
      [
        "01-natural",
        "02-listening",
        "03-casual",
        "04-playful",
        "05-thinking",
      ].map((directory) => `/characters/${directory}/${id}.png`),
    );
  }
});

test("DeepSeek exposes five adult poses and preserves supported selection", () => {
  const sources = poses.map((pose) => portraitSource("deepseek", pose.id));
  assert.equal(new Set(sources).size, 5);
  for (const pose of poses) {
    const src = portraitSource("deepseek", pose.id);
    assert.ok(src);
    assert.equal(
      new URL(src, "http://localhost").pathname,
      `/characters/adult/deepseek/${pose.id}.png`,
    );
    assert.deepEqual(
      selectCharacter({ characterId: "claude", pose: pose.id }, "deepseek"),
      { characterId: "deepseek", pose: pose.id },
    );
  }
});

test("unavailable images never borrow another character or pose", () => {
  for (const id of ["kimi", "qwen"]) {
    for (const pose of poses) assert.equal(portraitSource(id, pose.id), null);
  }
});

test("switching character preserves supported states and resets unsupported ones atomically", () => {
  const current = { characterId: "deepseek", pose: "thinking" };
  assert.deepEqual(selectCharacter(current, "claude"), {
    characterId: "claude",
    pose: "thinking",
  });
  assert.deepEqual(selectCharacter(current, "chatgpt"), {
    characterId: "chatgpt",
    pose: "thinking",
  });
  assert.deepEqual(selectCharacter(current, "kimi"), {
    characterId: "kimi",
    pose: "natural",
  });
  assert.deepEqual(
    selectCharacter({ characterId: "deepseek", pose: "casual" }, "chatgpt"),
    { characterId: "chatgpt", pose: "casual" },
  );
  assert.deepEqual(current, { characterId: "deepseek", pose: "thinking" });
});
