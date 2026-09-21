import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import styles from "./About.module.css";

export default async function About() {
  const t = await getTranslations("About");
  const experience = t.raw("experience") as string[];
  const growth = t.raw("growth") as string[];

  return (
    <Section id="about" title={t("title")}>
      <div className={styles.columns}>
        <div>
          <h3 className={styles.subtitle}>{t("experienceTitle")}</h3>
          <ul className={styles.list}>
            {experience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.subtitle}>{t("growthTitle")}</h3>
          <ul className={styles.list}>
            {growth.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
