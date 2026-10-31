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
import { fill } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionary";
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
export function CharacterStage({
  copy,
  profiles,
}: {
  copy: Dictionary["stage"];
  profiles: Dictionary["characters"];
}) {
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
  const profile = profiles[character.id];
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          [".host-plate", ".room-rail", ".stage-dock"],
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
          ".host-plate > :not(.profile-tagline)",
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
      <div className="character-display">
        <section
          className="host-plate glass-panel"
          aria-labelledby="character-name"
        >
          <h1 id="character-name">{profile.name}</h1>
          <p className="profile-tagline">{profile.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {profile.traits.map((trait) => (
              <Badge variant="secondary" key={trait}>
                {trait}
              </Badge>
            ))}
          </div>
          <p className="profile-description">{profile.description}</p>
        </section>
        <div className="stage-figure">
          {portraitSource(characterId, pose) && <StageAtmosphere />}
          <TabsContent value={characterId} className="character-panel">
            <PortraitTransition
              selection={selection}
              copy={copy}
              profiles={profiles}
            />
          </TabsContent>
          <div className="carousel-arrows">
            <Button
              variant="glass"
              size="icon"
              aria-label={copy.previous}
              onClick={() => selectRelative(-1)}
            >
              <ChevronLeft data-icon="inline-start" />
            </Button>
            <Button
              variant="glass"
              size="icon"
              aria-label={copy.next}
              onClick={() => selectRelative(1)}
            >
              <ChevronRight data-icon="inline-start" />
            </Button>
          </div>
        </div>
      </div>
      <aside className="room-rail glass-panel">
        <h2>{copy.roomTitle}</h2>
        <p>{copy.roomBody}</p>
        <p className="room-rail-note">{copy.roomNote}</p>
      </aside>
      <div className="stage-dock glass-panel">
        <div className="character-controls">
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
              aria-label={copy.poseLabel}
              aria-describedby="pose-availability"
              className="w-full"
            >
              {poses.map((item) => (
                <TabsTrigger
                  value={item.id}
                  key={item.id}
                  disabled={!portraitSource(characterId, item.id)}
                >
                  {copy.poses[item.id]}
                </TabsTrigger>
              ))}
            </TabsList>
            {poses.map((item) => (
              <TabsContent value={item.id} key={item.id} className="sr-only">
                {portraitSource(characterId, item.id)
                  ? fill(copy.shownAs, { state: copy.poses[item.id] })
                  : copy.stateMissing}
              </TabsContent>
            ))}
          </Tabs>
          <TabsList
            aria-label={copy.choose}
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
                  aria-label={profiles[item.id].name}
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
                    <AvatarFallback>
                      {profiles[item.id].shortName.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="character-choice-label">
                    {profiles[item.id].shortName}
                  </span>
                  <span className="choice-indicator" aria-hidden="true" />
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div className="carousel-position">
            <span aria-live="polite" aria-atomic="true">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(characters.length).padStart(2, "0")}
              <span className="sr-only">
                {fill(copy.positionName, { name: profile.name })}
              </span>
            </span>
          </div>
        </div>
        <div className="start-area">
          <Button
            className="w-full"
            size="lg"
            disabled
            aria-describedby="service-status"
          >
            {copy.start}
          </Button>
          <p id="service-status">
            {!portraitSource(characterId, "natural")
              ? copy.preparing
              : copy.disconnected}
          </p>
        </div>
      </div>
      <p id="pose-availability" className="sr-only" aria-live="polite">
        {!portraitSource(characterId, "natural")
          ? copy.posesPreparing
          : poses.every((item) => portraitSource(characterId, item.id))
            ? copy.posesReady
            : fill(copy.posesPartial, { state: copy.poses.natural })}
      </p>
    </Tabs>
  );
}
