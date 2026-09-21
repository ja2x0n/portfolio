import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import { experienceIds } from "@/content/experience";
import styles from "./Experience.module.css";

export default async function Experience() {
  const t = await getTranslations("Experience");

  return (
    <Section id="experience" title={t("title")}>
      <ul className={styles.list}>
        {experienceIds.map((id) => (
          <li key={id} className={styles.item}>
            <span className={styles.period}>{t(`items.${id}.period`)}</span>
            <span className={styles.label}>{t(`items.${id}.label`)}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
