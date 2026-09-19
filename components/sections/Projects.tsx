import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import styles from "./Projects.module.css";

export default async function Projects() {
  const t = await getTranslations("Projects");

  return (
    <Section id="projects" title={t("title")}>
      {/* 원형 Carousel이 들어갈 자리. 별도 Issue에서 구현한다. */}
      <div className={styles.placeholder}>
        <p>{t("placeholder")}</p>
      </div>
    </Section>
  );
}
