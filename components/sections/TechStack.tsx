import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import { type Skill, skills } from "@/content/skills";
import styles from "./TechStack.module.css";

function Logo({ skill }: { skill: Skill }) {
  return (
    // 로고를 받치는 밝은 바탕. 검은 글자가 든 로고도 어두운 테마에서 보인다.
    <span className={styles.plate}>
      <Image
        className={styles.logo}
        data-wordmark={skill.wordmark}
        src={skill.logo}
        alt=""
        width={96}
        height={96}
      />
    </span>
  );
}

function Chips({ items, from }: { items: Skill[]; from: number }) {
  return (
    <ul className={styles.chips}>
      {items.map((skill, i) => (
        <li
          key={skill.name}
          className={styles.chip}
          style={{ "--i": from + i } as React.CSSProperties}
        >
          <Logo skill={skill} />
          {skill.name}
        </li>
      ))}
    </ul>
  );
}

export default async function TechStack() {
  const t = await getTranslations("TechStack");

  // 주요 기술만 설명을 붙이고, 나머지는 이름만 칩으로 둔다.
  const main = skills.filter((skill) => skill.points);
  const rest = skills.filter((skill) => !skill.points && !skill.learning);
  const learning = skills.filter((skill) => skill.learning);

  return (
    <Section id="stack" title={t("title")}>
      <p className={styles.note}>{t("note")}</p>

      {/* --i 는 등장 순서다. 화면에 들어올 때 차례로 떠오른다. */}
      <div className={styles.mains}>
        {main.map((skill, i) => (
          <article
            key={skill.name}
            className={styles.main}
            style={{ "--i": i } as React.CSSProperties}
          >
            <p className={styles.group}>{t(`groups.${skill.group}`)}</p>
            <h3 className={styles.head}>
              <Logo skill={skill} />
              {skill.name}
            </h3>
            <ul className={styles.points}>
              {(t.raw(`points.${skill.points}`) as string[]).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className={styles.label}>{t("moreLabel")}</p>
      <Chips items={rest} from={main.length} />

      <p className={styles.label}>{t("learningBadge")}</p>
      <Chips items={learning} from={main.length + rest.length} />
    </Section>
  );
}
