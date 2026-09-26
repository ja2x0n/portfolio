import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import styles from "./About.module.css";

export default async function About() {
  const t = await getTranslations("About");
  const body = t.raw("body") as string[];

  return (
    // 섹션 제목 "About"은 스크린리더용으로만 두고, 화면에는 인삿말부터 보여준다.
    <Section id="about" title={t("title")} hideTitle>
      <div className={styles.layout}>
        {/* 사진 뒤에 이름을 테두리 글씨로 깔아 빈 좌우를 채운다. */}
        <div className={styles.figure}>
          <span className={styles.wordmark} aria-hidden="true">
            Heo Jae Won
          </span>
          <Image
            className={styles.photo}
            src="/images/profile-photo.jpg"
            alt={t("photoAlt")}
            width={1038}
            height={1108}
            sizes="(min-width: 768px) 280px, 62vw"
          />
        </div>

        <h3 className={styles.greeting}>{t("greeting")}</h3>

        <div>
          {body.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
