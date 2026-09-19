import styles from "./Section.module.css";

type Props = {
  id: string;
  title: string;
  /** 제목을 화면에서 숨긴다. 제목 대신 본문이 첫인상이 되는 Home에서 사용한다. */
  hideTitle?: boolean;
  children: React.ReactNode;
};

export default function Section({ id, title, hideTitle, children }: Props) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <h2
          id={`${id}-title`}
          className={hideTitle ? styles.srOnly : styles.title}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
