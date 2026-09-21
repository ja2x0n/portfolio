import Reveal from "@/components/Reveal/Reveal";
import styles from "./Section.module.css";

type Props = {
  id: string;
  title: string;
  /** 제목을 화면에서 숨긴다. 제목 대신 본문이 첫인상이 되는 Home에서 사용한다. */
  hideTitle?: boolean;
  /** 스크롤 등장 효과. 자체 등장 애니메이션이 있는 Home은 끈다. */
  reveal?: boolean;
  children: React.ReactNode;
};

export default function Section({
  id,
  title,
  hideTitle,
  reveal = true,
  children,
}: Props) {
  const heading = (
    <h2 id={`${id}-title`} className={hideTitle ? styles.srOnly : styles.title}>
      {title}
    </h2>
  );

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        {reveal ? (
          <>
            <Reveal>{heading}</Reveal>
            <Reveal delay={0.1}>{children}</Reveal>
          </>
        ) : (
          <>
            {heading}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
