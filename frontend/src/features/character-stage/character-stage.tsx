"use client";
import { useRef, useState } from "react";
import { getImageProps } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gsap, useGSAP } from "./motion";
import { StageAtmosphere } from "./stage-atmosphere";
import { PortraitTransition } from "./portrait-transition";
import {
  characters,
  poses,
  portraitSource,
  selectCharacter,
  type CharacterId,
  type PoseId,
  type Selection,
} from "./characters";
export function CharacterStage() {
  const experience = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Selection>({
    characterId: "deepseek",
    pose: "natural",
  });
  const { characterId, pose } = selection;
  const requestedSelection = useRef(selection);
  const requestSelection = (next: Selection) => {
    requestedSelection.current = next;
    setSelection(next);
  };
  const index = characters.findIndex((item) => item.id === characterId);
  const character = characters[index];
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          [".experience-heading", ".character-controls", ".start-area"],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity",
          },
        );
      });
      return () => media.revert();
    },
    { scope: experience },
  );
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".character-profile > :not(.profile-eyebrow)",
          { opacity: 0.45 },
          {
            opacity: 1,
            duration: 0.24,
            stagger: 0.02,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
        );
      });
      return () => media.revert();
    },
    { scope: experience, dependencies: [characterId], revertOnUpdate: true },
  );
  const changeCharacter = (id: string) => {
    if (characters.some((item) => item.id === id)) {
      requestSelection(
        selectCharacter(requestedSelection.current, id as CharacterId),
      );
    }
  };
  const selectRelative = (offset: number) =>
    changeCharacter(
      characters[
        (characters.findIndex(
          (item) => item.id === requestedSelection.current.characterId,
        ) +
          offset +
          characters.length) %
          characters.length
      ].id,
    );
  return (
    <Tabs
      ref={experience}
      value={characterId}
      onValueChange={changeCharacter}
      activationMode="manual"
      className="character-experience"
    >
      <div className="experience-heading">
        <h1>遇见你的 AI 伙伴</h1>
        <p>
          七位 AI 伙伴，各有性格。
          <span className="heading-detail">从一次轻松的交流开始。</span>
        </p>
      </div>
      <section
        className="character-profile glass-panel"
        aria-labelledby="character-name"
      >
        <p className="profile-eyebrow">角色档案</p>
        <h2 id="character-name">{character.name}</h2>
        <p className="profile-tagline">{character.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {character.traits.map((trait) => (
            <Badge variant="secondary" key={trait}>
              {trait}
            </Badge>
          ))}
        </div>
        <p className="profile-description">{character.description}</p>
      </section>
      <div className="character-display">
        {portraitSource(characterId, pose) && <StageAtmosphere />}
        <TabsContent value={characterId} className="character-panel">
          <PortraitTransition selection={selection} />
        </TabsContent>
      </div>
      <div className="character-controls glass-panel">
        <Tabs
          value={pose}
          onValueChange={(value) => {
            if (
              poses.some((item) => item.id === value) &&
              portraitSource(
                requestedSelection.current.characterId,
                value as PoseId,
              )
            ) {
              requestSelection({
                ...requestedSelection.current,
                pose: value as PoseId,
              });
            }
          }}
          activationMode="manual"
          className="pose-tabs"
        >
          <TabsList
            aria-label="人物状态"
            aria-describedby="pose-availability"
            className="w-full"
          >
            {poses.map((item) => (
              <TabsTrigger
                value={item.id}
                key={item.id}
                disabled={!portraitSource(characterId, item.id)}
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {poses.map((item) => (
            <TabsContent value={item.id} key={item.id} className="sr-only">
              {portraitSource(characterId, item.id)
                ? `人物以${item.label}展示`
                : "该状态素材暂未准备"}
            </TabsContent>
          ))}
        </Tabs>
        <TabsList
          aria-label="选择人物形象"
          variant="characters"
          className="character-choices"
        >
          {characters.map((item) => {
            const avatar = portraitSource(item.id, "natural");
            return (
              <TabsTrigger
                key={item.id}
                value={item.id}
                variant="character"
                aria-label={item.name}
              >
                <Avatar>
                  {avatar && (
                    <AvatarImage
                      src={
                        getImageProps({
                          src: avatar,
                          alt: "",
                          width: 132,
                          height: 198,
                        }).props.src
                      }
                      alt=""
                      className="character-avatar-image"
                    />
                  )}
                  <AvatarFallback>{item.shortName.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="character-choice-label">{item.shortName}</span>
                <span className="choice-indicator" aria-hidden="true" />
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="carousel-position">
          <span aria-live="polite" aria-atomic="true">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(characters.length).padStart(2, "0")}
            <span className="sr-only">，{character.name}</span>
          </span>
        </div>
      </div>
      <p id="pose-availability" className="sr-only" aria-live="polite">
        {!portraitSource(characterId, "natural")
          ? "形象准备中，五种状态暂不可用。"
          : poses.every((item) => portraitSource(characterId, item.id))
            ? "五种状态均可选择。"
            : "当前可选择自然陪伴，其余状态素材准备中。"}
      </p>
      <div className="carousel-arrows">
        <Button
          variant="glass"
          size="icon"
          aria-label="上一位人物"
          onClick={() => selectRelative(-1)}
        >
          <ChevronLeft data-icon="inline-start" />
        </Button>
        <Button
          variant="glass"
          size="icon"
          aria-label="下一位人物"
          onClick={() => selectRelative(1)}
        >
          <ChevronRight data-icon="inline-start" />
        </Button>
      </div>
      <div className="start-area">
        <Button
          className="w-full"
          size="lg"
          disabled
          aria-describedby="service-status"
        >
          开始交流
        </Button>
        <p id="service-status">
          {!portraitSource(characterId, "natural")
            ? "人物形象准备中"
            : "交流服务尚未连接"}
        </p>
      </div>
    </Tabs>
  );
}
