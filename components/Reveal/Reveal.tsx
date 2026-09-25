"use client";

import { MotionConfig, motion } from "motion/react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  /** 등장 시작을 늦추는 시간(초). 같은 섹션 안에서 제목 → 본문 순서를 만든다. */
  delay?: number;
};

/**
 * 화면에 들어올 때 한 번만 아래에서 떠오르며 나타난다.
 * 들어온 뒤에는 data-shown 을 남긴다. 안쪽 요소가 CSS 로 이어서 움직일 수 있다.
 */
export default function Reveal({ children, delay = 0 }: Props) {
  const [shown, setShown] = useState(false);

  return (
    // 모션 감소 설정이면 이동은 빼고 투명도만 바뀐다.
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        onViewportEnter={() => setShown(true)}
        data-shown={shown}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
