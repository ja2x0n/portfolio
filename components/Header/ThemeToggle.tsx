"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import styles from "./Header.module.css";

const subscribe = () => () => {};

export default function ThemeToggle() {
  const t = useTranslations("Header");
  const { resolvedTheme, setTheme } = useTheme();
  // 서버는 사용자의 테마를 모르므로 마운트 전에는 아이콘을 그리지 않는다.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  // 마운트 전에는 서버와 같은 값으로 그려야 hydration이 어긋나지 않는다.
  const dark = mounted && resolvedTheme === "dark";

  const toggle = (next: string) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !document.startViewTransition) return setTheme(next);
    // 화면 전체를 교차 전환한다. 전환 안에서 테마 속성이 바로 바뀌어야 하므로 flushSync를 쓴다.
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  };

  return (
    <button
      type="button"
      className={styles.control}
      aria-label={dark ? t("toLight") : t("toDark")}
      onClick={() => toggle(dark ? "light" : "dark")}
    >
      {mounted && (dark ? <Sun size={20} /> : <Moon size={20} />)}
    </button>
  );
}
