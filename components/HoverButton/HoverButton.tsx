"use client";

import styles from "./HoverButton.module.css";

type Props = {
  href: string;
  variant: "primary" | "secondary";
  icon: React.ReactNode;
  external?: boolean;
  children: string;
};

/**
 * 호버하면 글자가 위로 롤링되고, 마우스가 들어온 지점에서 원이 퍼지며 버튼을 채운다.
 * 원의 시작점(--x, --y)을 넣기 위해서만 클라이언트 컴포넌트로 둔다.
 */
export default function HoverButton({
  href,
  variant,
  icon,
  external,
  children,
}: Props) {
  const setOrigin = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <a
      href={href}
      className={`${styles.button} ${styles[variant]}`}
      onPointerEnter={setOrigin}
      onPointerLeave={setOrigin}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span className={styles.label}>
        <span>{children}</span>
        {/* 롤링으로 아래에서 올라오는 복제 글자. 스크린리더는 읽지 않는다. */}
        <span aria-hidden="true">{children}</span>
      </span>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </a>
  );
}
