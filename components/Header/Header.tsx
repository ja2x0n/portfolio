"use client";

import { motion, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** 앵커로 내려갔을 때 제목 위와 내용 아래에 남길 여백 */
const ANCHOR_GAP = 48;
/** 여백을 다 주지 못할 때도 아래는 이만큼은 남긴다 */
const MIN_BOTTOM_GAP = 8;
/** 다른 페이지에서 돌아온 뒤 화면이 그려질 때까지 기다리는 시간 */
const RESTORE_MS = 120;

/**
 * 화면보다 긴 섹션으로 내려간다. 브라우저는 대상의 위를 화면 위에 맞추는데,
 * 그러면 아래쪽(캐러셀의 버튼 줄 같은)이 잘린다.
 * 아래까지 보이도록 더 내려가되, 제목이 Header에 붙지 않을 만큼만 내려간다.
 * 화면에 들어가는 섹션은 건드리지 않는다.
 */
function scrollToSection(target: HTMLElement, smooth: boolean) {
  const headerHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--header-height",
    ),
  );
  if (target.offsetHeight <= window.innerHeight - headerHeight) return false;

  // 위아래 여백까지 채우면 내용이 화면 끝에 붙으므로 여백은 빼고 본다.
  // 제목이 아니라 섹션을 기준으로 잰다. 제목은 등장 애니메이션 중에 밀려 있을 수 있다.
  const rect = target.getBoundingClientRect();
  const style = getComputedStyle(target);
  const contentTop =
    rect.top + window.scrollY + parseFloat(style.paddingBlockStart);
  const contentBottom =
    rect.bottom + window.scrollY - parseFloat(style.paddingBlockEnd);

  // 제목 위 여백을 우선하되, 그 때문에 아래가 잘리지는 않게 한다.
  // 언어에 따라 섹션 길이가 달라 둘을 다 줄 수 없는 경우가 있다.
  const preferred = Math.min(
    contentBottom + ANCHOR_GAP - window.innerHeight,
    contentTop - headerHeight - ANCHOR_GAP,
  );
  const lowest = contentBottom + MIN_BOTTOM_GAP - window.innerHeight;

  window.scrollTo({
    top: Math.max(preferred, lowest),
    behavior: smooth ? "smooth" : "instant",
  });
  return true;
}

function sectionFromHash() {
  return location.hash ? document.getElementById(location.hash.slice(1)) : null;
}

function useAnchorScroll(pathname: string) {
  // 같은 페이지 안에서 앵커 링크를 눌렀을 때
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;
      const link = (e.target as Element).closest?.("a");
      if (!link || link.target === "_blank") return;

      const url = new URL(link.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;

      const target = document.getElementById(url.hash.slice(1));
      if (!target) return;

      // 내려가기 전에 가로채야 한다. Link가 먼저 처리하면 라우터가 위에 맞춰 버린다.
      const prevented = scrollToSection(target, true);
      if (!prevented) return;
      e.preventDefault();
      e.stopPropagation();
      history.replaceState(null, "", url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // 상세 페이지에서 뒤로 가거나 목록으로 돌아왔을 때도 같은 높이로 맞춘다.
  useEffect(() => {
    const timer = setTimeout(() => {
      const target = sectionFromHash();
      if (!target) return;
      scrollToSection(target, false);
      // 폰트가 바뀌면 섹션 길이가 달라진다. 자리잡은 뒤에 한 번 더 맞춘다.
      document.fonts?.ready.then(() => scrollToSection(target, false));
    }, RESTORE_MS);
    return () => clearTimeout(timer);
  }, [pathname]);
}

export default function Header() {
  useAnchorScroll(usePathname());
  const { scrollYProgress } = useScroll();
  // 새로고침으로 페이지 중간에서 시작해도 현재 위치를 바로 반영한다.
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={styles.inner}>
        <Link href="/#projects" className={styles.link}>
          <span className={styles.linkRoll}>
            <span>Projects</span>
            <span aria-hidden="true">Projects</span>
          </span>
        </Link>
        <Link href="/#home" className={styles.wordmark}>
          Heo Jae Won
        </Link>
        <div className={styles.controls}>
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
      <motion.div
        className={styles.progress}
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
    </header>
  );
}
