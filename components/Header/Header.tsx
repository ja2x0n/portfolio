"use client";

import { motion, useScroll } from "motion/react";
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

/**
 * 같은 페이지 안의 앵커 이동. 브라우저는 대상의 위를 화면 위에 맞추는데,
 * 섹션이 화면보다 길면 아래쪽(캐러셀의 버튼 줄 같은)이 잘린다.
 * 그런 섹션은 아래까지 보이도록 더 내려가되, 제목이 Header에 붙지 않을 만큼만 내려간다.
 */
function useAnchorScroll() {
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

      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
      );
      if (target.offsetHeight <= window.innerHeight - headerHeight) return;

      // 내려가기 전에 가로채야 한다. Link가 먼저 처리하면 라우터가 위에 맞춰 버린다.
      e.preventDefault();
      e.stopPropagation();

      const style = getComputedStyle(target);
      // 아래 여백까지 채우면 내용이 화면 끝에 붙으므로 여백은 빼고 본다.
      const contentBottom =
        target.getBoundingClientRect().bottom +
        window.scrollY -
        parseFloat(style.paddingBlockEnd);
      const heading = target.querySelector("h2");
      const headingTop = heading
        ? heading.getBoundingClientRect().top + window.scrollY
        : target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.min(
          contentBottom + ANCHOR_GAP - window.innerHeight,
          headingTop - headerHeight - ANCHOR_GAP,
        ),
      });
      history.replaceState(null, "", url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}

export default function Header() {
  useAnchorScroll();
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
