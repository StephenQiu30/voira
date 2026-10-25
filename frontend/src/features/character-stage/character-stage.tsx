"use client";
import { useState } from "react";
import Image, { getImageProps } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  characters,
  poses,
  portraitSource,
  type Character,
  type PoseId,
} from "./characters";
function Portrait({ character, pose }: { character: Character; pose: PoseId }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="portrait-frame">
      {failed ? (
        <div className="portrait-error" role="alert">
          <p>人物形象暂时无法显示</p>
          <Button variant="glass" onClick={() => setFailed(false)}>
            重新加载
          </Button>
        </div>
      ) : (
        <Image
          src={portraitSource(character.id, pose)}
          alt={`${character.name}，${poses.find((item) => item.id === pose)!.label}`}
          fill
          sizes="(max-width: 767px) 220px, (max-width: 1023px) 310px, 400px"
          preload={character.id === "deepseek" && pose === "natural"}
          onError={() => setFailed(true)}
          className="portrait-image"
        />
      )}
    </div>
  );
}
export function CharacterStage() {
  const [characterId, setCharacterId] = useState<string>(characters[0].id);
  const [pose, setPose] = useState<PoseId>("natural");
  const index = characters.findIndex((item) => item.id === characterId);
  const character = characters[index];
  const selectRelative = (offset: number) =>
    setCharacterId(
      characters[(index + offset + characters.length) % characters.length].id,
    );
  return (
    <Tabs
      value={characterId}
      onValueChange={setCharacterId}
      activationMode="manual"
      className="character-experience"
    >
      <div className="experience-heading">
        <h1>遇见你的 AI 伙伴</h1>
        <p>
          五位性格，三种姿态。
          <br />
          从一次轻松的交流开始。
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
        {characters.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            className="character-panel"
          >
            <Portrait key={`${item.id}-${pose}`} character={item} pose={pose} />
          </TabsContent>
        ))}
      </div>
      <div className="character-controls glass-panel">
        <Tabs
          value={pose}
          onValueChange={(value) => setPose(value as PoseId)}
          activationMode="manual"
          className="pose-tabs"
        >
          <TabsList aria-label="人物姿态" className="w-full">
            {poses.map((item) => (
              <TabsTrigger value={item.id} key={item.id}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {poses.map((item) => (
            <TabsContent value={item.id} key={item.id} className="sr-only">
              人物以{item.label}展示
            </TabsContent>
          ))}
        </Tabs>
        <TabsList
          aria-label="选择人物形象"
          variant="characters"
          className="character-choices"
        >
          {characters.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              variant="character"
              aria-label={item.name}
            >
              <Avatar className="size-11">
                <AvatarImage
                  src={
                    getImageProps({
                      src: portraitSource(item.id, "natural"),
                      alt: "",
                      width: 132,
                      height: 198,
                    }).props.src
                  }
                  alt=""
                  className="character-avatar-image"
                />
                <AvatarFallback>{item.shortName.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span>{item.shortName}</span>
              <span className="choice-indicator" aria-hidden="true" />
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="carousel-position">
          <div className="carousel-bars" aria-hidden="true">
            {characters.map((item) => (
              <span key={item.id} data-active={item.id === characterId} />
            ))}
          </div>
          <span aria-live="polite" aria-atomic="true">
            {String(index + 1).padStart(2, "0")} / 05
            <span className="sr-only">，{character.name}</span>
          </span>
        </div>
      </div>
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
        <p id="service-status">交流服务尚未连接</p>
      </div>
    </Tabs>
  );
}
