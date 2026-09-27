import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./ProjectList.module.css";

type Item = {
  slug: string;
  name: string;
  summary: string;
  period?: string;
  stack?: string[];
  image?: string | null;
};

type Labels = { viewDetail: string };

/**
 * 프로젝트 목록. 한 줄에 하나씩, 왼쪽에 표지 오른쪽에 설명을 둔다.
 * 표지에 이미 프로젝트 로고가 있으므로 그 위에 이름을 겹치지 않는다.
 * 서버에서 그린다. 움직임은 모두 CSS가 맡는다.
 */
export default function ProjectList({
  items,
  labels,
}: {
  items: Item[];
  labels: Labels;
}) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={item.name} style={{ "--i": i } as React.CSSProperties}>
          <Link
            href={`/projects/${item.slug}`}
            className={styles.row}
            data-mask
          >
            <div className={styles.cover}>
              {item.image ? (
                <Image
                  className={styles.photo}
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                />
              ) : null}
            </div>

            <div className={styles.body}>
              <h3 className={styles.head}>
                <span className={styles.name}>{item.name}</span>
                {/* 호버하면 왼쪽부터 그어지는 선. 이름과 여백을 이어 준다. */}
                <span className={styles.rule} aria-hidden="true" />
              </h3>

              <p className={styles.summary}>{item.summary}</p>

              {item.stack?.length ? (
                <ul className={styles.tags}>
                  {item.stack.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}

              {item.period ? (
                <p className={styles.period}>{item.period}</p>
              ) : null}

              <span className={styles.go}>
                {labels.viewDetail}
                <ArrowRight
                  className={styles.arrow}
                  size={16}
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
