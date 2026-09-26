import { getTranslations } from "next-intl/server";
import Section from "@/components/Section/Section";
import styles from "./Values.module.css";

type Item = { title: string; body: string };

export default async function Values() {
  const t = await getTranslations("Values");
  const headline = t.raw("headline") as string[];
  const items = t.raw("items") as Item[];

  return (
    // 섹션 제목 "Values"는 스크린리더용으로 두고, 화면에는 헤드라인을 보여준다.
    <Section id="values" title={t("title")} hideTitle>
      <h3 className={styles.headline}>
        {headline.map((line, i) => (
          // 둘째 줄만 포인트 컬러로 둔다. 줄바꿈은 문구가 정한다.
          <span key={line} className={i === 1 ? styles.accent : undefined}>
            {line}
          </span>
        ))}
      </h3>

      {/* --i 는 등장 순서다. 화면에 들어올 때 차례로 떠오른다. */}
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li
            key={item.title}
            className={styles.item}
            style={{ "--i": i } as React.CSSProperties}
          >
            <h4 className={styles.title}>{item.title}</h4>
            <p className={styles.body}>
              {t.rich(`items.${i}.body`, { b: (chunks) => <b>{chunks}</b> })}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
