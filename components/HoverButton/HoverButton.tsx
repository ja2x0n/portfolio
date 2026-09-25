"use client";

import { Link } from "@/i18n/navigation";
import { setPointerOrigin } from "../pointerOrigin";
import styles from "./HoverButton.module.css";

type Props = {
  href: string;
  /** ghost 는 배경과 테두리 없이 글자만 둔다. */
  variant: "primary" | "secondary" | "ghost" | "onPhoto";
  icon: React.ReactNode;
  /** 돌아가기처럼 아이콘이 글자 앞에 와야 할 때 */
  iconFirst?: boolean;
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
  iconFirst,
  external,
  children,
}: Props) {
  const shared = {
    className: `${styles.button} ${styles[variant]}${
      iconFirst ? ` ${styles.reverse}` : ""
    }`,
    onPointerEnter: setPointerOrigin,
    onPointerLeave: setPointerOrigin,
  };

  const inner = (
    <>
      <span className={styles.label}>
        <span>{children}</span>
        {/* 롤링으로 아래에서 올라오는 복제 글자. 스크린리더는 읽지 않는다. */}
        <span aria-hidden="true">{children}</span>
      </span>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </>
  );

  // 같은 페이지 안의 앵커와 바깥 주소는 그대로 a 를 쓴다.
  // 다른 화면으로 갈 때만 언어를 유지하는 Link 를 쓴다.
  if (external || href.startsWith("#")) {
    return (
      <a
        href={href}
        {...shared}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} {...shared}>
      {inner}
    </Link>
  );
}
