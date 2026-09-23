"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./PageMask.module.css";

/** 덮는 시간과 걷히는 시간. CSS의 transition 과 맞춘다. */
const COVER_MS = 450;
const OPEN_MS = 550;
/** 이동이 끝나지 않아도 이만큼 지나면 걷는다. 화면이 덮인 채로 남지 않게 한다. */
const SAFETY_MS = 2000;

type State = "idle" | "covering" | "covered" | "opening";

/**
 * 누른 자리에서 원이 퍼져 화면을 덮고, 그 사이에 페이지가 바뀐 뒤 다시 걷힌다.
 * `data-mask`가 붙은 링크에만 적용한다.
 */
export default function PageMask() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const mask = useRef<HTMLDivElement>(null);
  const href = useRef<string | null>(null);
  // 덮기 시작한 경로. 이 경로에서 벗어나면 이동이 끝난 것으로 본다.
  const leaving = useRef(pathname);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;
      const link = (e.target as Element).closest?.("a[data-mask]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank")
        return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      // 모션을 줄이는 설정에서는 그냥 이동한다.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();

      // 키보드로 눌렀을 때는 좌표가 없으므로 링크 가운데에서 퍼지게 한다.
      const r = link.getBoundingClientRect();
      const x = e.detail === 0 ? r.left + r.width / 2 : e.clientX;
      const y = e.detail === 0 ? r.top + r.height / 2 : e.clientY;
      // 가장 먼 모서리까지 닿아야 화면이 다 덮인다.
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const el = mask.current;
      if (!el) return;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
      // 가장자리가 흐릿하게 풀리므로, 진한 가운데만으로 화면을 덮을 만큼 크게 잡는다.
      el.style.setProperty("--size", `${radius * 2.6}px`);

      href.current = url.pathname + url.hash;
      leaving.current = location.pathname;
      setState("covering");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // 다 덮은 뒤에 페이지를 바꾼다. 바뀌는 순간이 보이지 않게 한다.
  useEffect(() => {
    if (state !== "covering") return;
    const timer = setTimeout(() => {
      // 덮여 있는 동안 맨 위로 올려둔다. 이러지 않으면 새 화면이 열린 뒤에
      // 브라우저가 위로 스크롤하는 모습이 보인다.
      window.scrollTo({ top: 0, behavior: "instant" });
      if (href.current) router.push(href.current);
      setState("covered");
    }, COVER_MS);
    return () => clearTimeout(timer);
  }, [state, router]);

  // 이동이 끝나면 걷는다. 끝나지 않아도 일정 시간이 지나면 걷는다.
  useEffect(() => {
    if (state !== "covered") return;
    if (pathname !== leaving.current) {
      setState("opening");
      return;
    }
    const timer = setTimeout(() => setState("opening"), SAFETY_MS);
    return () => clearTimeout(timer);
  }, [state, pathname]);

  useEffect(() => {
    if (state !== "opening") return;
    const timer = setTimeout(() => setState("idle"), OPEN_MS);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div
      ref={mask}
      className={styles.mask}
      data-state={state}
      aria-hidden="true"
    >
      <span className={styles.smoke} />
    </div>
  );
}
