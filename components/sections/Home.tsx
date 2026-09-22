import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import HoverButton from "@/components/HoverButton/HoverButton";
import Section from "@/components/Section/Section";
import Spotlight from "@/components/Spotlight/Spotlight";
import { githubUrl } from "@/content/links";
import styles from "./Home.module.css";

/** 이름과 상단 라벨은 모든 언어에서 영문으로 고정한다. */
const nameLines = ["Heo", "Jae Won"];

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <Section
      id="home"
      title={t("title")}
      hideTitle
      reveal={false}
      variant="hero"
    >
      <div className={styles.glow} aria-hidden="true">
        <Spotlight className={styles.spot} />
      </div>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.hero}>
        <div className={styles.meta}>
          <span className={styles.status}>Frontend Developer</span>
          <span className={styles.metaRight}>
            © 2026
            <br />
            Based in Korea
          </span>
        </div>

        <h1 className={styles.name}>
          {nameLines.map((line, i) => (
            <span key={line} className={styles.line}>
              {/* 줄 사이 공백: 스크린리더가 "Heo Jae Won"으로 읽게 한다. */}
              {i > 0 && " "}
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <div className={styles.bottom}>
          <p className={styles.message}>{t("message")}</p>
          <div className={styles.actions}>
            <HoverButton
              href="#projects"
              variant="primary"
              icon={<ArrowRight size={18} />}
            >
              {t("viewProjects")}
            </HoverButton>
            <HoverButton
              href={githubUrl}
              variant="secondary"
              icon={<ArrowUpRight size={18} />}
              external
            >
              {t("github")}
            </HoverButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
