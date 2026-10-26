"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  characters,
  poses,
  portraitSource,
  type Selection,
} from "./characters";
import { gsap, useGSAP } from "./motion";

const frameKey = ({ characterId, pose }: Selection) => `${characterId}-${pose}`;

function PortraitLayer({
  selection,
  incoming,
  onReady,
  onFailure,
}: {
  selection: Selection;
  incoming: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const [decoded, setDecoded] = useState(false);
  const character = characters.find(
    (item) => item.id === selection.characterId,
  )!;
  const source = portraitSource(selection.characterId, selection.pose);
  useGSAP(
    () => {
      mounted.current = true;
      if (!source) onReady();
      return () => {
        mounted.current = false;
      };
    },
    { scope: layer },
  );
  return (
    <div
      ref={layer}
      className={`portrait-layer ${incoming ? "portrait-incoming" : "portrait-current"}`}
      aria-hidden={incoming || undefined}
    >
      {source ? (
        <Image
          src={source}
          alt={`${character.name}，${poses.find((item) => item.id === selection.pose)!.label}`}
          fill
          sizes="(max-width: 767px) 240px, 400px"
          preload={
            selection.characterId === "deepseek" && selection.pose === "natural"
          }
          className="portrait-image"
          data-ready={decoded}
          onLoad={async (event) => {
            const image = event.currentTarget;
            try {
              await image.decode();
              if (!mounted.current) return;
              setDecoded(true);
              onReady();
            } catch {
              if (mounted.current) onFailure();
            }
          }}
          onError={() => onFailure()}
        />
      ) : (
        <div className="portrait-pending">
          <span className="pending-monogram" aria-hidden="true">
            {character.shortName.slice(0, 1)}
          </span>
          <p>形象准备中</p>
          <span>{character.name} 的故事，等待与你相遇。</span>
        </div>
      )}
    </div>
  );
}

export function PortraitTransition({ selection }: { selection: Selection }) {
  const frame = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(selection);
  const [currentReady, setCurrentReady] = useState(false);
  const [transition, setTransition] = useState<Selection | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [retries, setRetries] = useState<Record<string, number>>({});
  // Freeze a running dissolve. New requests replace only the not-yet-visible candidate.
  const candidate = transition ?? selection;
  const currentKey = frameKey(current);
  const candidateKey = frameKey(candidate);
  const changing = currentKey !== candidateKey;
  const errorKey = changing ? candidateKey : currentKey;
  const hasError = failed === errorKey;

  useGSAP(
    () => {
      if (!transition) return;
      const media = gsap.matchMedia();
      const complete = () => {
        setCurrent(transition);
        setCurrentReady(true);
        setTransition(null);
      };
      media.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          regular: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduced || !currentReady) {
            complete();
            return;
          }
          const duration =
            transition.characterId === current.characterId ? 0.28 : 0.42;
          gsap
            .timeline({ onComplete: complete })
            .fromTo(
              ".portrait-incoming",
              { opacity: 0 },
              { opacity: 1, duration, ease: "sine.inOut" },
              0,
            )
            .fromTo(
              ".portrait-current",
              { opacity: 1 },
              { opacity: 0, duration, ease: "sine.inOut" },
              0,
            );
        },
      );
      return () => media.revert();
    },
    { scope: frame, dependencies: [transition], revertOnUpdate: true },
  );

  const keyFor = (key: string) => `${key}:${retries[key] ?? 0}`;
  return (
    <div
      ref={frame}
      className="portrait-frame"
      aria-busy={(changing || !currentReady) && !hasError}
      data-phase={transition ? "crossfade" : changing ? "preparing" : "idle"}
    >
      <PortraitLayer
        key={keyFor(currentKey)}
        selection={current}
        incoming={false}
        onReady={() => setCurrentReady(true)}
        onFailure={() => setFailed(currentKey)}
      />
      {changing && (
        <PortraitLayer
          key={keyFor(candidateKey)}
          selection={candidate}
          incoming
          onReady={() => setTransition(candidate)}
          onFailure={() => setFailed(candidateKey)}
        />
      )}
      {!currentReady && !hasError && (
        <span className="portrait-loading" role="status">
          正在加载形象…
        </span>
      )}
      {changing && !transition && !hasError && (
        <span className="stage-switch-status" role="status">
          正在准备下一形象…
        </span>
      )}
      {hasError && (
        <div
          className={`portrait-feedback ${currentReady ? "portrait-feedback-retained" : ""}`}
          role="alert"
        >
          <p>
            {currentReady
              ? "新形象加载失败，已保留当前形象"
              : "人物形象暂时无法显示"}
          </p>
          <Button
            variant="glass"
            onClick={() => {
              setFailed(null);
              setRetries((value) => ({
                ...value,
                [errorKey]: (value[errorKey] ?? 0) + 1,
              }));
            }}
          >
            重新加载
          </Button>
        </div>
      )}
    </div>
  );
}
