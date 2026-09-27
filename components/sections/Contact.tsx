import { ArrowUpRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import HoverButton from "@/components/HoverButton/HoverButton";
import Section from "@/components/Section/Section";
import { channels, email } from "@/content/links";
import styles from "./Contact.module.css";

export default async function Contact() {
  const t = await getTranslations("Contact");
  const headline = t.raw("headline") as string[];

  return (
    // 섹션 제목 "Contact"는 스크린리더용으로 두고, 화면에는 라벨과 문구를 보여준다.
    <Section id="contact" title={t("title")} hideTitle>
      <p className={styles.label} aria-hidden="true">
        {t("title")}
      </p>

      <h3 className={styles.headline}>
        {headline.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h3>
      <p className={styles.note}>{t("note")}</p>

      {/* 주소를 드러내지 않는다. 누르면 메일 앱이 열린다. */}
      <div className={styles.action}>
        <HoverButton
          href={`mailto:${email}`}
          variant="primary"
          icon={<Mail size={18} />}
          external
        >
          {t("sendMail")}
        </HoverButton>
      </div>

      <ul className={styles.channels}>
        {channels.map((channel, i) => (
          <li key={channel.id} style={{ "--i": i } as React.CSSProperties}>
            <HoverButton
              href={channel.href}
              variant="secondary"
              icon={<ArrowUpRight size={16} />}
              external
            >
              {channel.label}
            </HoverButton>
          </li>
        ))}
      </ul>
    </Section>
  );
}
