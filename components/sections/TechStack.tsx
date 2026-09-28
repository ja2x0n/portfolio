import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import { type Skill, skills } from "@/content/skills";
import styles from "./TechStack.module.css";

/**
 * 한 줄 = 기술 하나. 누르면 설명이 펼쳐진다.
 *
 * 하나만 열리는 동작은 details 의 name 속성이 처리한다. 열림 상태를 직접 들고
 * 있지 않으므로 이 섹션은 서버 컴포넌트로 남는다.
 */
function Row({
  skill,
  index,
  group,
  desc,
  open,
}: {
  skill: Skill;
  index: number;
  group: string;
  desc: string;
  open: boolean;
}) {
  return (
    <li className={styles.item} style={{ "--i": index } as React.CSSProperties}>
      <details className={styles.details} name="stack" open={open}>
        <summary className={styles.summary}>
          <span className={styles.num}>
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* 로고를 받치는 밝은 바탕. 검은 글자가 든 로고도 어두운 테마에서 보인다. */}
          <span className={styles.plate}>
            <Image
              className={styles.logo}
              data-wordmark={skill.wordmark}
              src={skill.logo}
              alt=""
              width={96}
              height={96}
              /* 화면에서는 3.25rem 판 안에 들어간다. 이 값이 없으면
                 브라우저가 96px 의 2배인 256px 짜리를 받는다. */
              sizes="52px"
            />
          </span>

          {/* 호버하면 아래 복제 글자가 올라온다. 스크린리더는 복제를 읽지 않는다. */}
          <span className={styles.name}>
            <span>{skill.name}</span>
            <span aria-hidden="true">{skill.name}</span>
          </span>

          <span className={styles.group}>{group}</span>
          <ChevronDown className={styles.chevron} size={20} aria-hidden />
        </summary>

        <div className={styles.content}>
          <p className={styles.desc}>{desc}</p>
        </div>
      </details>
    </li>
  );
}

export default async function TechStack() {
  const t = await getTranslations("TechStack");

  const used = skills.filter((skill) => !skill.learning);
  const learning = skills.filter((skill) => skill.learning);

  const row = (skill: Skill, index: number) => (
    <Row
      key={skill.id}
      skill={skill}
      index={index}
      group={t(`groups.${skill.group}`)}
      desc={t(`desc.${skill.id}`)}
      // 다 닫힌 채로 시작하면 설명이 있다는 것을 모르고 지나친다.
      open={index === 0}
    />
  );

  return (
    <Section id="stack" title={t("title")}>
      <p className={styles.headline}>{t("headline")}</p>
      <p className={styles.note}>{t("note")}</p>

      <ul className={styles.list}>{used.map(row)}</ul>

      <p className={styles.label}>{t("learningBadge")}</p>
      <ul className={styles.list}>
        {learning.map((skill, i) => row(skill, used.length + i))}
      </ul>
    </Section>
  );
}
