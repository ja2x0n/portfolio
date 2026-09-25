"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { setPointerOrigin } from "../pointerOrigin";
import styles from "./Header.module.css";

/** 화면에는 각 언어의 글자 하나로 보인다. URL은 routing의 ko/en/ja를 그대로 쓴다. */
const labels = { ko: "한", en: "EN", ja: "日" } as const;
/** 스크린리더가 읽는 언어 이름 */
const names = { ko: "한국어", en: "English", ja: "日本語" } as const;
type Locale = keyof typeof labels;

export default function LanguageSwitch() {
  const t = useTranslations("Header");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // 메뉴에서 가리키고 있는 언어. 버튼 자리에 미리 보여준다.
  const [preview, setPreview] = useState<Locale | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    setPreview(null);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
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
    <div
      ref={rootRef}
      className={styles.lang}
      // 마우스는 올리기만 해도 열린다. 터치·키보드는 버튼을 눌러 연다.
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && close()}
    >
      <button
        ref={buttonRef}
        type="button"
        className={styles.control}
        onPointerEnter={setPointerOrigin}
        onPointerLeave={setPointerOrigin}
        aria-label={`${t("language")}: ${names[locale]}`}
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => (open ? close() : setOpen(true))}
      >
        <span key={preview ?? locale} className={styles.swap}>
          {labels[preview ?? locale]}
        </span>
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
                  aria-label={names[l]}
                  className={styles.langItem}
                  onPointerEnter={() => setPreview(l)}
                  onPointerLeave={() => setPreview(null)}
                  onFocus={() => setPreview(l)}
                  onBlur={() => setPreview(null)}
                  onClick={close}
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
