import { Award } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import { activityGroups, awardIds, educationId } from "@/content/experience";
import styles from "./Experience.module.css";

export default async function Experience() {
  const t = await getTranslations("Experience");

  return (
    <Section id="experience" title={t("title")}>
      {/* 수상을 앞에 둔다. 같은 무게로 나열하면 목록에 묻힌다. */}
      <h3 className={styles.label}>{t("awardsLabel")}</h3>
      <ul className={styles.awards}>
        {awardIds.map((id, i) => (
          <li
            key={id}
            className={styles.award}
            style={{ "--i": i } as React.CSSProperties}
          >
            <Award className={styles.icon} size={18} aria-hidden />
            <span className={styles.awardName}>{t(`items.${id}.label`)}</span>
            <span className={styles.period}>{t(`items.${id}.period`)}</span>
          </li>
        ))}
      </ul>

      {/* 아래는 두 칸으로 나눈다. 왼쪽에 학력, 오른쪽에 활동. */}
      <div className={styles.bottom}>
        <div>
          <h3 className={styles.label}>{t("educationLabel")}</h3>
          <div className={styles.education}>
            <p className={styles.eduYear}>{t("education.year")}</p>
            <p className={styles.school}>{t(`items.${educationId}.label`)}</p>
            <p className={styles.eduStatus}>{t("education.status")}</p>
          </div>
        </div>

        <div>
          {/* 활동은 연도로 묶는다. 줄마다 "진행 중" 이 반복되지 않는다. */}
          <h3 className={styles.label}>{t("activityLabel")}</h3>
          <div className={styles.groups}>
            {activityGroups.map((group, gi) => (
              <section
                key={group.year}
                className={styles.group}
                style={{ "--i": awardIds.length + gi } as React.CSSProperties}
              >
                <h4 className={styles.year}>{group.year}</h4>
                <ul className={styles.items}>
                  {group.ids.map((id) => (
                    <li key={id} className={styles.item}>
                      <span className={styles.name}>
                        {t(`items.${id}.label`)}
                      </span>
                      <span className={styles.period}>
                        {t(`items.${id}.period`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
