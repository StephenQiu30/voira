import assert from "node:assert/strict";
import test from "node:test";
import { hasLocalMatch } from "next/dist/shared/lib/match-local-pattern.js";
import nextConfig from "../next.config.ts";
import {
  characters,
  poses,
  portraitSource,
} from "../src/features/character-stage/characters.ts";

test("Next image optimization accepts all adopted portraits including revision queries", () => {
  for (const character of characters) {
    for (const pose of poses) {
      const source = portraitSource(character.id, pose.id);
      if (source)
        assert.ok(
          hasLocalMatch(nextConfig.images.localPatterns, source),
          source,
        );
    }
  }
  assert.ok(
    hasLocalMatch(
      nextConfig.images.localPatterns,
      "/characters/adult/chatgpt/master.png?v=next-revision",
    ),
  );
});

test("scene images remain available without widening unrelated image paths", () => {
  for (const source of [
    "/scenes/voira-studio.png",
    "/scenes/voira-studio-dark.png",
  ]) {
    assert.ok(hasLocalMatch(nextConfig.images.localPatterns, source));
  }
  for (const source of [
    "/scenes/voira-studio.png?v=unexpected",
    "/unrelated/image.png",
  ]) {
    assert.equal(hasLocalMatch(nextConfig.images.localPatterns, source), false);
  }
});
