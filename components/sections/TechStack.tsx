import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import { skillGroups } from "@/content/skills";
import styles from "./TechStack.module.css";

export default async function TechStack() {
  const t = await getTranslations("TechStack");

  return (
    <Section id="stack" title={t("title")}>
      <p className={styles.note}>{t("note")}</p>
      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <div key={group.id} className={styles.group}>
            <h3 className={styles.groupTitle}>{t(`groups.${group.id}`)}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item.name} className={styles.item}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.desc}>{t(`desc.${item.desc}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
