import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import { contactLinks } from "@/content/links";
import styles from "./Contact.module.css";

export default async function Contact() {
  const t = await getTranslations("Contact");

  return (
    <Section id="contact" title={t("title")}>
      <p className={styles.note}>{t("note")}</p>
      <ul className={styles.list}>
        {contactLinks.map((link) => {
          const external = !link.href.startsWith("mailto:");
          return (
            <li key={link.id} className={styles.item}>
              <a
                className={styles.link}
                href={link.href}
                {...(external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
