"use client";

import { useEffect, useRef } from "react";

/**
 * 마우스 위치를 --mx, --my로 넘겨 빛이 따라오게 한다.
 * 움직임과 크기는 CSS가 맡는다. 터치·펜 입력은 무시한다.
 */
export default function Spotlight({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.parentElement;
    if (!el || !area) return;
    // 기기 판별을 처음 한 번만 하면 화면 모드가 바뀐 뒤 반응하지 않으므로 입력마다 확인한다.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
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
