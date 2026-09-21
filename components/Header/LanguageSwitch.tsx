"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./Header.module.css";

/** 화면에 보이는 언어 코드. URL은 routing의 ko/en/ja를 그대로 쓴다. */
const labels = { ko: "KO", en: "EN", ja: "JP" } as const;

export default function LanguageSwitch() {
  const t = useTranslations("Header");
  const locale = useLocale() as keyof typeof labels;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.lang}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.control}
        aria-label={`${t("language")}: ${labels[locale]}`}
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {labels[locale]}
      </button>
      {open && (
        <ul id="language-menu" className={styles.langMenu}>
          {routing.locales
            .filter((l) => l !== locale)
            .map((l) => (
              <li key={l}>
                {/* 언어별 페이지 구조가 같으므로 스크롤 위치를 그대로 둔다. */}
                <Link
                  href={pathname}
                  locale={l}
                  scroll={false}
                  hrefLang={l}
                  className={styles.langItem}
                  onClick={() => setOpen(false)}
                >
                  {labels[l]}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
