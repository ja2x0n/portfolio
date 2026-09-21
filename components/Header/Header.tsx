"use client";

import { motion, useScroll } from "motion/react";
import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export default function Header() {
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
          Projects
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
