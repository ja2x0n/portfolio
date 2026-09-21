import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import { githubUrl } from "@/content/links";
import styles from "./Home.module.css";

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <Section id="home" title={t("title")} hideTitle>
      <div className={styles.layout}>
        <div className={styles.text}>
          <p className={styles.greeting}>{t("greeting")}</p>
          <h1 className={styles.name}>
            {/* <wbr>: 줄바꿈을 허용할 지점. 일본어 이름에서만 쓴다. */}
            {t.rich("name", { wbr: () => <wbr /> })}
          </h1>
          <p className={styles.role}>{t("role")}</p>
          <p className={styles.message}>{t("message")}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projects">
              {t("viewProjects")}
            </a>
            <a
              className={styles.secondary}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
          </div>
        </div>
        <Image
          className={styles.photo}
          src="/images/profile.jpg"
          alt={t("photoAlt")}
          width={472}
          height={630}
          priority
        />
      </div>
    </Section>
  );
}
