"use client";

import { useEffect, useRef } from "react";

/**
 * 마우스 위치를 --mx, --my로 넘겨 빛이 따라오게 한다.
 * 움직임과 크기는 CSS가 맡는다. 마우스가 없는 기기에서는 아무것도 하지 않는다.
 */
export default function Spotlight({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.parentElement;
    if (!el || !area) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.dataset.active = "true";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className={className} />;
}
