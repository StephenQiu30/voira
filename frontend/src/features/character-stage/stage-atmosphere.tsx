"use client";

import { useEffect, useRef } from "react";

export function StageAtmosphere() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let generation = 0;
    let dispose: (() => void) | undefined;
    const sync = () => {
      const request = ++generation;
      dispose?.();
      dispose = undefined;
      element.dataset.renderer = "static";
      if (preference.matches) return;
      // The renderer is optional: the original scene and portrait remain DOM content.
      void import("./stage-scene")
        .then(({ createStageScene }) => {
          if (request !== generation) return;
          dispose = createStageScene(element);
        })
        .catch(() => {
          if (request === generation) element.dataset.renderer = "static";
        });
    };
    sync();
    preference.addEventListener("change", sync);
    return () => {
      generation++;
      preference.removeEventListener("change", sync);
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={host}
      className="stage-atmosphere"
      data-renderer="static"
      aria-hidden="true"
    />
  );
}
