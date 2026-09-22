import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import styles from "./About.module.css";

const statKeys = ["leader", "velog"] as const;

export default async function About() {
  const t = await getTranslations("About");
  const body = t.raw("body") as string[];

  return (
    // 섹션 제목 "About"은 스크린리더용으로 두고, 화면에는 작은 라벨과 큰 문장을 보여준다.
    <Section id="about" title={t("title")} hideTitle>
      <div className={styles.layout}>
        <div className={styles.text}>
          <p className={styles.eyebrow} aria-hidden="true">
            {t("title")}
          </p>
          <h3 className={styles.heading}>{t("heading")}</h3>
          {body.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </div>

        <figure className={styles.figure}>
          <Image
            className={styles.photo}
            src="/images/profile.jpg"
            alt={t("photoAlt")}
            width={472}
            height={630}
            sizes="(min-width: 768px) 420px, 100vw"
          />
          <figcaption className={styles.stats}>
            {statKeys.map((key) => (
              <span key={key} className={styles.stat}>
                <strong>{t(`stats.${key}.value`)}</strong>
                <span>{t(`stats.${key}.label`)}</span>
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
